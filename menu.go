package nuwa

import "github.com/zgwit/iot-master/v4/menu"

func init() {

	menu.Register("nuwa", &menu.Menu{
		Name:       "Web组态",
		Icon:       "control",
		Domain:     []string{"admin"},
		Privileges: nil,
		Items: []*menu.Item{
			{Name: "工程", Url: "/$nuwa/project", Type: "web"},
			{Name: "组件库", Url: "/$nuwa/component", Type: "web"},
		},
	})

	menu.Register("nuwa-project", &menu.Menu{
		Name:       "Web组态",
		Icon:       "control",
		Domain:     []string{"project"},
		Privileges: nil,
		Items: []*menu.Item{
			{Name: "工程", Url: "/$nuwa/project", Type: "web"},
		},
	})
}
