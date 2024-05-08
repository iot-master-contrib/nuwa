package api

import (
	"archive/zip"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/api"
	"github.com/zgwit/iot-master/v4/web/curd"
	"mime"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var imageRegex *regexp.Regexp

func isImage(name string) bool {
	ext := filepath.Ext(name)
	mt := mime.TypeByExtension(ext)
	//判断是否为图片
	return imageRegex.MatchString(mt)
}

func init() {
	imageRegex = regexp.MustCompile(`^image\/`)

	api.Register("GET", "nuwa/galleries", galleryList)
}

type Gallery struct {
	Id     string   `json:"id"`
	Name   string   `json:"name,omitempty"`
	Images []string `json:"images,omitempty"`
}

func galleryList(ctx *gin.Context) {
	root := filepath.Join(viper.GetString("data"), "nuwa", "gallery")

	images, err := scanImages(root)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	curd.OK(ctx, images)
}

func scanImages(root string) ([]string, error) {
	entries, err := os.ReadDir(root)
	if err != nil {
		return nil, err
	}

	var images []string

	for _, entry := range entries {
		//子目录
		if entry.IsDir() {
			is, err := scanImages(filepath.Join(root, entry.Name()))
			if err != nil {
				return nil, err
			}
			for _, img := range is {
				images = append(images, entry.Name()+"/"+img)
			}
			continue
		}

		//判断是否为图片
		if isImage(entry.Name()) {
			images = append(images, entry.Name())
			continue
		}

		ext := filepath.Ext(entry.Name())

		//zip压缩包
		if filepath.Ext(entry.Name()) == ".zip" {
			zp := filepath.Join(root, entry.Name())
			z, err := zip.OpenReader(zp)
			if err != nil {
				return nil, err
			}
			name := strings.TrimSuffix(entry.Name(), ext)
			for _, zf := range z.File {
				if isImage(zf.Name) {
					images = append(images, name+"/"+zf.Name)
				}
			}
			_ = z.Close()
		}
	}

	return images, nil
}
