package nuwa

import (
	"embed"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
)

//go:embed all:www
var wwwFiles embed.FS


func init() {
	//前端静态文件
	web.Static.Put("/$nuwa", http.FS(wwwFiles), "www", "index.html")
}
