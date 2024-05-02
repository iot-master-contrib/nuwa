package api

import (
	"archive/zip"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/api"
	"github.com/zgwit/iot-master/v4/web/curd"
	"os"
	"path/filepath"
)

func init() {
	api.Register("GET", "fonts", fontList)
	api.Register("GET", "font/*id", fontDetail)
}

type Font struct {
	Id   string `json:"id"`
	Name string `json:"name,omitempty"`
	Face string `json:"face,omitempty"` //font-face.css
}

func fontList(ctx *gin.Context) {
	root := filepath.Join(viper.GetString("data"), "font")

	cs, err := scanManifest[Font](root)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	curd.OK(ctx, cs)
}

func fontDetail(ctx *gin.Context) {
	var c Font

	//第一步，解析文件夹
	dir := filepath.Join(viper.GetString("data"), "font", ctx.Param("id"))
	name := filepath.Join(dir, "manifest.json")
	err := parseJson(name, &c)
	if err == nil {
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
			curd.Fail(ctx, "找不到字体")
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

	curd.OK(ctx, &c)
}
