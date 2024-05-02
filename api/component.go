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
	api.Register("GET", "components", componentList)

	api.Register("GET", "component/*id", componentDetail)

	api.Register("GET", "collections", collectionList)

	//api.Register("GET","/export", curd.ApiExport("hmi_component", "hmi_component"))
	//
	//api.Register("POST","/import", curd.ApiImport("hmi_component"))

}

func scanComponents(root string) ([]*Component, error) {
	entries, err := os.ReadDir(root)
	if err != nil {
		return nil, err
	}

	var components []*Component
	for _, entry := range entries {
		f := filepath.Join(root, entry.Name())

		if entry.IsDir() {
			cs, err := scanComponents(f)
			if err != nil {
				return nil, err
			}
			components = append(components, cs...)
			continue
		}

		if filepath.Ext(entry.Name()) == ".zip" {
			z, err := zip.OpenReader(f)
			if err != nil {
				return nil, err
			}
			defer z.Close()

			var component Component
			err = parseJsonFromZip(z, "manifest.json", &component)
			if err != nil {
				//TODO 此处不应该退出
				return nil, err
			}

			components = append(components, &component)
		}
	}
	return components, nil
}

func componentList(ctx *gin.Context) {
	root := filepath.Join(viper.GetString("data"), "components")

	cs, err := scanComponents(root)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	curd.OK(ctx, cs)
}

func componentDetail(ctx *gin.Context) {
	component, err := loadComponent(ctx.Param("id"))
	if err != nil {
		curd.Error(ctx, err)
		return
	}
	curd.OK(ctx, component)
}

func collectionList(ctx *gin.Context) {

}
