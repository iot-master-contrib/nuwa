package api

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"io"
	"io/fs"
	"os"
	"path/filepath"
)

func parseJson(name string, ret any) error {
	//打开压缩包内的文件
	f, err := os.Open(name)
	if err != nil {
		return err
	}
	defer f.Close()

	buf, err := io.ReadAll(f)
	if err != nil {
		return err
	}

	return json.Unmarshal(buf, &ret)
}

func parseJsonFromZip(zp *zip.ReadCloser, name string, ret any) error {
	//打开压缩包内的文件
	f, err := zp.Open(name)
	if err != nil {
		return err
	}
	defer f.Close()

	buf, err := io.ReadAll(f)
	if err != nil {
		return err
	}

	return json.Unmarshal(buf, &ret)
}

func scanManifest[T any](root string) ([]*T, error) {
	entries, err := os.ReadDir(root)
	if err != nil {
		return nil, err
	}

	var ts []*T
	for _, entry := range entries {
		var t T

		f := filepath.Join(root, entry.Name())

		//目录形式
		if entry.IsDir() {
			//先找manifest.json
			ff := filepath.Join(f, "manifest.json")
			err := parseJson(ff, &t)
			if err != nil {
				if errors.Is(err, fs.ErrNotExist) {
					//没有manifest.json, 则认为是普通目录
					cs, err := scanManifest[T](f)
					if err != nil {
						return nil, err
					}
					ts = append(ts, cs...)
					continue
				}
				return nil, err
			}
			ts = append(ts, &t)
			continue
		}

		//压缩包形式
		if filepath.Ext(entry.Name()) == ".zip" {
			z, err := zip.OpenReader(f)
			if err != nil {
				return nil, err
			}
			defer z.Close()

			err = parseJsonFromZip(z, "manifest.json", &t)
			if err != nil {
				if errors.Is(err, fs.ErrNotExist) {
					//没有Manifest则不认为此处不应该退出
					continue
				}
				return nil, err
			}

			ts = append(ts, &t)
		}
	}
	return ts, nil
}
