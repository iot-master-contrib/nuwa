package scada

import (
	"embed"
	"encoding/json"
	"github.com/iot-master-contrib/nuwa/api"
	_ "github.com/iot-master-contrib/nuwa/docs"
	"github.com/zgwit/iot-master/v4/mqtt"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
)

// go:embed all:app/scada
var wwwFiles embed.FS

// @title 组态接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/scada/api/
// @query.collection.format multi
func main() {
}

func Route(app *web.Engine) {

	//注册前端接口
	api.RegisterRoutes(app.Group("/app/scada/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(app.Group("/app/scada"), "scada")
}

func Register() error {
	payload, _ := json.Marshal(App())
	token := mqtt.Publish("master/register", payload)
	token.Wait()
	return token.Error()
}

func Static(fs *web.FileSystem) {
	//前端静态文件
	fs.Put("/app/scada", http.FS(wwwFiles), "", "app/scada/index.html")
}

func Shutdown() error {

	//只关闭Web就行了，其他通过defer关闭

	return nil
}
