package types

import (
	"github.com/zgwit/iot-master/v4/db"
	"time"
)

func init() {
	db.Register(new(NuwaProject))
}

type NuwaProject struct {
	Id          string    `json:"id,omitempty"  xorm:"pk"`
	Name        string    `json:"name,omitempty"`
	Description string    `json:"description,omitempty"`
	Snapshot    string    `json:"snapshot,omitempty"`
	Version     int       `json:"version,omitempty" xorm:"version"`
	Updated     time.Time `json:"updated,omitempty" xorm:"updated"`
	Created     time.Time `json:"created,omitempty" xorm:"created"`
}

type HmiPage struct {
	Name            string `json:"name,omitempty"`
	Content         any    `json:"content,omitempty"`
	BackgroundColor string `json:"background_color,omitempty"`
	BackgroundImage string `json:"background_image,omitempty"`
}
