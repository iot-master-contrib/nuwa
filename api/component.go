package api

import (
	"github.com/iot-master-contrib/nuwa/types"
	"github.com/zgwit/iot-master/v4/api"
	"github.com/zgwit/iot-master/v4/web/curd"
)

func init() {

	api.Register("POST", "/count", curd.ApiCount[types.NuwaComponent]())

	api.Register("POST", "/search", curd.ApiSearch[types.NuwaComponent]())

	api.Register("GET", "/list", curd.ApiList[types.NuwaComponent]())

	api.Register("POST", "/create", curd.ApiCreateHook[types.NuwaComponent](curd.GenerateID[types.NuwaComponent](), nil))

	api.Register("GET", "/:id", curd.ParseParamStringId, curd.ApiGet[types.NuwaComponent]())

	api.Register("POST", "/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.NuwaComponent](nil, nil,
		"id", "name", "icon", "type", "category"))

	api.Register("GET", "/:id/delete", curd.ParseParamStringId, curd.ApiDelete[types.NuwaComponent]())

	//api.Register("GET","/export", curd.ApiExport("hmi_component", "hmi_component"))
	//
	//api.Register("POST","/import", curd.ApiImport("hmi_component"))

}

// @Summary 查询组件数量
// @Schemes
// @Description 查询组件数量
// @Tags component
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回组件数量
// @Router /component/count [post]
func noopComponentCount() {}

// @Summary 查询组件
// @Schemes
// @Description 查询组件
// @Tags component
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.NuwaComponent] 返回组件信息
// @Router /component/search [post]
func noopComponentSearch() {}

// @Summary 查询组件
// @Schemes
// @Description 查询组件
// @Tags component
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.NuwaComponent] 返回组件信息
// @Router /component/list [get]
func noopComponentList() {}

// @Summary 创建组件
// @Schemes
// @Description 创建组件
// @Tags component
// @Param search body types.NuwaComponent true "组件信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.NuwaComponent] 返回组件信息
// @Router /component/create [post]
func noopNuwaComponentCreate() {}

// @Summary 获取组件
// @Schemes
// @Description 获取组件
// @Tags component
// @Param id path int true "组件ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.NuwaComponent] 返回组件信息
// @Router /component/{id} [get]
func noopComponentGet() {}

// @Summary 修改组件
// @Schemes
// @Description 修改组件
// @Tags component
// @Param id path int true "组件ID"
// @Param component body types.NuwaComponent true "组件信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.NuwaComponent] 返回组件信息
// @Router /component/{id} [post]
func noopComponentUpdate() {}

// @Summary 删除组件
// @Schemes
// @Description 删除组件
// @Tags component
// @Param id path int true "组件ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.NuwaComponent] 返回组件信息
// @Router /component/{id}/delete [get]
func noopNuwaComponentDelete() {}

// @Summary 导出组件
// @Schemes
// @Description 导出组件
// @Tags product
// @Accept json
// @Produce octet-stream
// @Router /component/export [get]
func noopNuwaComponentExport() {}

// @Summary 导入组件
// @Schemes
// @Description 导入组件
// @Tags product
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回组件数量
// @Router /component/import [post]
func noopNuwaComponentImport() {}
