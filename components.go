package nuwa

import (
	"archive/zip"
	"github.com/zgwit/iot-master/v4/web"
	"io/fs"
	"net/http"
	"path/filepath"
)

type zf struct {
	fs.File
}

func (f *zf) Seek(offset int64, whence int) (int64, error) {
	return 0, nil
}

func (f *zf) Readdir(count int) ([]fs.FileInfo, error) {
	return nil, nil
}

func (f *zf) Write([]byte) (int, error) {
	return 0, nil
}

type zips struct {
	root string
}

func (zs *zips) Open(name string) (http.File, error) {
	dir, file := filepath.Split(name)

	//每个组件都是一个压缩包
	zp := dir + ".zip"
	z, err := zip.OpenReader(zp)
	if err != nil {
		return nil, err
	}
	defer z.Close()

	//打开压缩包内的文件
	f, err := z.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	return &zf{File: f}, nil
}

func StaticComponents(relativePath string, root string) {
	web.Engine.StaticFS(relativePath, &zips{root: root})
}
