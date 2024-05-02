package api

import (
	"archive/zip"
	"encoding/json"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/types"
	"io"
	"path/filepath"
)

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

func parseJsonFromZip(zp *zip.ReadCloser, name string, ret any) error {
	//打开压缩包内的文件
	f, err := zp.Open(name)
	if err != nil {
		return err
	}
	defer f.Close()

	buf, err := io.ReadAll(f)
	if err != nil {
		return err
	}

	return json.Unmarshal(buf, &ret)
}

func loadComponent(id string) (*Component, error) {
	name := filepath.Join(viper.GetString("data"), "components", id+".zip")

	z, err := zip.OpenReader(name)
	if err != nil {
		return nil, err
	}
	defer z.Close()

	var c Component
	err = parseJsonFromZip(z, "manifest.json", &c)
	if err != nil {
		return nil, err
	}

	//解析附加内容
	_ = parseJsonFromZip(z, "properties.json", &c.Properties)
	_ = parseJsonFromZip(z, "bindings.json", &c.Bindings)
	_ = parseJsonFromZip(z, "hooks.json", &c.Hooks)
	_ = parseJsonFromZip(z, "events.json", &c.Events)
	_ = parseJsonFromZip(z, "listeners.json", &c.Listeners)

	return &c, nil
}
