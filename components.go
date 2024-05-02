package nuwa

import (
	"archive/zip"
	"github.com/zgwit/iot-master/v4/web"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"
)

type componentFile struct {
	fs.File
	component *zip.ReadCloser
}

func (f *componentFile) Seek(offset int64, whence int) (int64, error) {
	return 0, nil
}

func (f *componentFile) Readdir(count int) ([]fs.FileInfo, error) {
	return nil, nil
}

func (f *componentFile) Write([]byte) (int, error) {
	return 0, nil
}

func (f *componentFile) Close() error {
	_ = f.component.Close()
	return f.File.Close()
}

type zips struct {
	root string
}

func (zs *zips) Open(name string) (http.File, error) {
	dir, file := filepath.Split(name)

	dir = strings.TrimSuffix(dir, "/")
	dir = strings.TrimSuffix(dir, "\\")

	//每个组件都是一个压缩包
	zp := filepath.Join(zs.root, dir+".zip")
	z, err := zip.OpenReader(zp)
	if err != nil {
		return nil, err
	}

	//打开压缩包内的文件
	f, err := z.Open(file)
	if err != nil {
		_ = z.Close()
		return nil, err
	}

	return &componentFile{File: f, component: z}, nil
}

func StaticComponents(relativePath string, root string) {
	web.Engine.StaticFS(relativePath, &zips{root: root})
}
