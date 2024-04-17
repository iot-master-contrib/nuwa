package nuwa

import (
	"embed"
	_ "github.com/iot-master-contrib/nuwa/docs"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
)

// go:embed all:www
var wwwFiles embed.FS

// @title 组态接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/scada/api/
// @query.collection.format multi
func main() {
}

func init() {
	//前端静态文件
	web.Static.Put("/$nuwa", http.FS(wwwFiles), "www", "index.html")
}
