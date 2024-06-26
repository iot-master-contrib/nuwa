package nuwa

import (
	"embed"
	_ "github.com/iot-master-contrib/nuwa/api"
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

	//全部放一起了
	root := filepath.Join(viper.GetString("data"), "nuwa")
	StaticZipFS("/nuwa", root)

	////组件库
	//root := filepath.Join(viper.GetString("data"), "component")
	//web.Engine.StaticFS("/component", &zipFS{root: root})
	//
	////字体库
	//root = filepath.Join(viper.GetString("data"), "font")
	//web.Engine.StaticFS("/font", &zipFS{root: root})
	//
	////图片库
	//root = filepath.Join(viper.GetString("data"), "gallery")
	//web.Engine.StaticFS("/gallery", &zipFS{root: root})

	return nil
}

func Shutdown() error {
	return nil
}
