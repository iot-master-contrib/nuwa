package api

import (
	"github.com/zgwit/iot-master/v4/types"
)

type Component struct {
	Id         string `json:"id"`
	Icon       string `json:"icon,omitempty"`       //图标
	Name       string `json:"name,omitempty"`       //名称
	Collection string `json:"collection,omitempty"` //分类
	Version    string `json:"version,omitempty"`    //版本

	//控件属性
	Properties []types.FormItem `json:"properties,omitempty"`

	//数据绑定
	Variables []Variable `json:"variables,omitempty"`
	Hook      string     `json:"hook,omitempty"`

	//控件事件
	Events []Event `json:"events,omitempty"`

	//事件监听
	Listeners map[string]string `json:"listeners,omitempty"`
}

type Variable struct {
	Name    string `json:"name,omitempty"`    //变量
	Label   string `json:"label,omitempty"`   //显示名称
	Default any    `json:"default,omitempty"` //默认
}

type Event struct {
	Name  string `json:"name,omitempty"`  //变量
	Label string `json:"label,omitempty"` //显示名称
}
