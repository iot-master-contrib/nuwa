package api

import (
	"archive/zip"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/api"
	"github.com/zgwit/iot-master/v4/types"
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

type Binding struct {
	Name    string `json:"name,omitempty"`    //变量
	Label   string `json:"label,omitempty"`   //显示名称
	Default any    `json:"default,omitempty"` //默认
}

type Event struct {
	Name  string `json:"name,omitempty"`  //变量
	Label string `json:"label,omitempty"` //显示名称
}

type Component struct {
	Id         string `json:"id"`
	Icon       string `json:"icon,omitempty"`       //图标
	Name       string `json:"name,omitempty"`       //名称
	Collection string `json:"collection,omitempty"` //分类
	Version    string `json:"version,omitempty"`    //版本

	//控件属性
	Properties []types.FormItem `json:"properties,omitempty"`

	//数据绑定
	Bindings []Binding         `json:"bindings,omitempty"`
	Hooks    map[string]string `json:"hooks,omitempty"`

	//控件事件
	Events []Event `json:"events,omitempty"`

	//事件监听
	Listeners map[string]string `json:"listeners,omitempty"`
}

func componentList(ctx *gin.Context) {
	root := filepath.Join(viper.GetString("data"), "component")

	cs, err := scanManifest[Component](root)
	if err != nil {
		curd.Error(ctx, err)
		return
	}

	curd.OK(ctx, cs)
}

func componentDetail(ctx *gin.Context) {
	var c Component

	//第一步，解析文件夹
	dir := filepath.Join(viper.GetString("data"), "component", ctx.Param("id"))
	name := filepath.Join(dir, "manifest.json")
	err := parseJson(name, &c)
	if err == nil {
		//解析附加内容
		_ = parseJson(filepath.Join(dir, "properties.json"), &c.Properties)
		_ = parseJson(filepath.Join(dir, "bindings.json"), &c.Bindings)
		_ = parseJson(filepath.Join(dir, "hooks.json"), &c.Hooks)
		_ = parseJson(filepath.Join(dir, "events.json"), &c.Events)
		_ = parseJson(filepath.Join(dir, "listeners.json"), &c.Listeners)
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
			curd.Fail(ctx, "找不到组件")
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

	//解析附加内容
	_ = parseJsonFromZip(z, "properties.json", &c.Properties)
	_ = parseJsonFromZip(z, "bindings.json", &c.Bindings)
	_ = parseJsonFromZip(z, "hooks.json", &c.Hooks)
	_ = parseJsonFromZip(z, "events.json", &c.Events)
	_ = parseJsonFromZip(z, "listeners.json", &c.Listeners)

	curd.OK(ctx, &c)
}

func collectionList(ctx *gin.Context) {

}
