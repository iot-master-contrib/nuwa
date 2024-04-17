package types

import "time"

func init() {
	db.Register(new(NuwaComponent), new(NuwaComponentVersion))
}

type NuwaComponent struct {
	Id       string    `json:"id,omitempty" xorm:"pk"`
	Name     string    `json:"name,omitempty"`     //名称
	Icon     string    `json:"icon,omitempty"`     //图标
	Type     string    `json:"type,omitempty"`     //类型 line shape html ...
	Category string    `json:"category,omitempty"` //分类
	Version  int       `json:"version,omitempty" xorm:"version"`
	Updated  time.Time `json:"updated" xorm:"updated"`
	Created  time.Time `json:"created" xorm:"created"`
}

type NuwaComponentVersion struct {
	ComponentId string    `json:"component_id" xorm:"index"`
	Version     string    `json:"version,omitempty"`
	Created     time.Time `json:"created" xorm:"created"`
}

type HmiComponentEvent struct {
	Name  string `json:"name,omitempty"`
	Label string `json:"label,omitempty"`
}

type HmiProperty struct {
	Name    string              `json:"name,omitempty"`
	Path    string              `json:"path,omitempty"`
	Type    string              `json:"type,omitempty"`
	Default any                 `json:"default,omitempty"`
	Options []HmiPropertyOption `json:"options,omitempty"`
	Max     int                 `json:"max,omitempty"`
	Min     int                 `json:"min,omitempty"`
	Step    int                 `json:"step,omitempty"`
}

type HmiPropertyOption struct {
	Name  string `json:"name,omitempty"`
	Value any    `json:"value,omitempty"`
}
