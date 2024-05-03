import {NuwaComponent} from "../../nuwa";
import {NzButtonComponent} from "ng-zorro-antd/button";

export const ControlButton: NuwaComponent = {
    name: '按钮', id: 'button',
    icon: "/assets/widgets/button.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: NzButtonComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
