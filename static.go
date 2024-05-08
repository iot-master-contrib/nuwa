package nuwa

import (
	"archive/zip"
	"github.com/zgwit/iot-master/v4/web"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type zipFile struct {
	fs.File
	component *zip.ReadCloser
}

func (f *zipFile) Seek(offset int64, whence int) (int64, error) {
	return 0, nil
}

func (f *zipFile) Readdir(count int) ([]fs.FileInfo, error) {
	return nil, nil
}

func (f *zipFile) Write([]byte) (int, error) {
	return 0, nil
}

func (f *zipFile) Close() error {
	_ = f.component.Close()
	return f.File.Close()
}

type zipFS struct {
	root string
}

func (zfs *zipFS) openZip(dir, file string) (http.File, error) {
	dir = strings.TrimSuffix(dir, "/")
	dir = strings.TrimSuffix(dir, "\\")
	//dir = strings.TrimSuffix(dir, string(filepath.Separator))

	//每个组件都是一个压缩包
	zp := filepath.Join(zfs.root, dir+".zip")
	zf, err := zip.OpenReader(zp)
	if err != nil {
		//找不到zip，则向上级文件中寻找
		if os.IsNotExist(err) && len(dir) > 0 {
			d, n := filepath.Split(dir)
			return zfs.openZip(d, n+"/"+file)
		}
		return nil, err
	}

	//打开压缩包内的文件
	f, err := zf.Open(file)
	if err != nil {
		_ = zf.Close()
		return nil, err
	}

	return &zipFile{File: f, component: zf}, nil
}

func (zfs *zipFS) Open(name string) (http.File, error) {
	//第一步先找文件
	ff, err := os.Open(filepath.Join(zfs.root, name))
	if err == nil {
		return http.File(ff), nil
	}

	//不是不存在
	if !os.IsNotExist(err) {
		return nil, err
	}

	//尝试打开zip文件
	dir, file := filepath.Split(name)
	return zfs.openZip(dir, file)
}

func StaticZipFS(relativePath string, root string) {
	web.Engine.StaticFS(relativePath, &zipFS{root: root})
}
