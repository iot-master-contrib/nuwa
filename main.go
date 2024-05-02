package nuwa

import (
	"embed"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/boot"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
	"path/filepath"
)

//go:embed all:www
var wwwFiles embed.FS

func init() {
	//前端静态文件
	web.Static.Put("/$nuwa", http.FS(wwwFiles), "www", "index.html")

	boot.Register("nuwa", &boot.Task{
		Startup:  Startup,
		Shutdown: Shutdown,
		Depends:  []string{"database", "web"},
	})
}

func Startup() error {
	//组件库
	//StaticComponents("/components", filepath.Join(viper.GetString("data"), "components"))
	root := filepath.Join(viper.GetString("data"), "components")
	web.Engine.StaticFS("/components", &zips{root: root})
	return nil
}

func Shutdown() error {
	return nil
}
