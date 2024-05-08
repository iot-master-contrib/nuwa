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
)

var imageRegex *regexp.Regexp

func init() {
	imageRegex = regexp.MustCompile(`^image\/`)

	api.Register("GET", "nuwa/galleries", galleryList)
	api.Register("GET", "nuwa/gallery/*id", galleryDetail)
}

type Gallery struct {
	Id     string   `json:"id"`
	Name   string   `json:"name,omitempty"`
	Images []string `json:"images,omitempty"`
}

func galleryList(ctx *gin.Context) {
	root := filepath.Join(viper.GetString("data"), "gallery")

	cs, err := scanManifest[Gallery](root)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	curd.OK(ctx, cs)
}

func galleryDetail(ctx *gin.Context) {
	var c Gallery

	//第一步，解析文件夹
	dir := filepath.Join(viper.GetString("data"), "nuwa", "gallery", ctx.Param("id"))
	name := filepath.Join(dir, "manifest.json")
	err := parseJson(name, &c)
	if err == nil {
		entries, err := os.ReadDir(dir)
		if err == nil {
			curd.Error(ctx, err)
			return
		}

		for _, entry := range entries {
			if entry.IsDir() {
				continue
			}
			ext := filepath.Ext(entry.Name())
			mt := mime.TypeByExtension(ext)
			//判断是否为图片
			if imageRegex.MatchString(mt) {
				c.Images = append(c.Images, entry.Name())
			}
		}

		curd.OK(ctx, &c)
		return
	}

	if !os.IsNotExist(err) {
		curd.Error(ctx, err)
		return
	}

	//第二步，解析压缩包
	zp := dir + ".zip"
	z, err := zip.OpenReader(zp)
	if err != nil {
		if os.IsNotExist(err) {
			curd.Fail(ctx, "找不到相册")
			return
		}
		curd.Error(ctx, err)
		return
	}
	defer z.Close()

	err = parseJsonFromZip(z, "manifest.json", &c)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	//遍历zip
	for _, f := range z.File {
		ext := filepath.Ext(f.Name)
		mt := mime.TypeByExtension(ext)
		//判断是否为图片
		if imageRegex.MatchString(mt) {
			c.Images = append(c.Images, f.Name)
		}
	}

	curd.OK(ctx, &c)
}
