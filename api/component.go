package api

import (
	"archive/zip"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/api"
	"github.com/zgwit/iot-master/v4/web/curd"
	"io"
	"os"
	"path/filepath"
)

func init() {
	api.Register("GET", "component/list", componentList)

	api.Register("GET", "collection/list", collectionList)

	//api.Register("GET","/export", curd.ApiExport("hmi_component", "hmi_component"))
	//
	//api.Register("POST","/import", curd.ApiImport("hmi_component"))

}

func readManifest(name string) (*Component, error) {
	z, err := zip.OpenReader(name)
	if err != nil {
		return nil, err
	}
	defer z.Close()

	//打开压缩包内的文件
	f, err := z.Open("manifest.json")
	if err != nil {
		return nil, err
	}

	buf, err := io.ReadAll(f)
	if err != nil {
		return nil, err
	}

	var component Component
	err = json.Unmarshal(buf, &component)
	if err != nil {
		return nil, err
	}

	return &component, nil
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

		c, err := readManifest(f)
		if err != nil {
			//TODO 此处不应该退出
			return nil, err
		}

		components = append(components, c)
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

func collectionList(ctx *gin.Context) {

}
