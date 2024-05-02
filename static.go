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

type File struct {
	fs.File
	component *zip.ReadCloser
}

func (f *File) Seek(offset int64, whence int) (int64, error) {
	return 0, nil
}

func (f *File) Readdir(count int) ([]fs.FileInfo, error) {
	return nil, nil
}

func (f *File) Write([]byte) (int, error) {
	return 0, nil
}

func (f *File) Close() error {
	_ = f.component.Close()
	return f.File.Close()
}

type fsWithZip struct {
	root string
}

func (cs *fsWithZip) Open(name string) (http.File, error) {
	ff, err := os.Open(filepath.Join(cs.root, name))
	if err == nil {
		return http.File(ff), nil
	}

	//不是不存在
	if !os.IsNotExist(err) {
		return nil, err
	}

	//尝试打开zip文件
	dir, file := filepath.Split(name)

	dir = strings.TrimSuffix(dir, "/")
	dir = strings.TrimSuffix(dir, "\\")

	//每个组件都是一个压缩包
	zp := filepath.Join(cs.root, dir+".zip")
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

	return &File{File: f, component: z}, nil
}

func StaticComponents(relativePath string, root string) {
	web.Engine.StaticFS(relativePath, &fsWithZip{root: root})
}
