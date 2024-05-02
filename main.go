package nuwa

import (
	"embed"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
	"path/filepath"
)

//go:embed all:www
var wwwFiles embed.FS

func init() {
	//前端静态文件
	web.Static.Put("/$nuwa", http.FS(wwwFiles), "www", "index.html")

	//组件库
	//StaticComponents("/components", filepath.Join(viper.GetString("data"), "components"))
	root := filepath.Join(viper.GetString("data"), "components")
	web.Engine.StaticFS("/components", &zips{root: root})
}
