import {NuwaComponent} from "../../nuwa";
import {NzSwitchComponent} from "ng-zorro-antd/switch";

export const ControlSwitch: NuwaComponent = {
    name: '开关', id: '$switch',
    icon: "assets/widgets/switch.svg",
    type: "angular",
    meta: {width: 100, height: 40},
    content: NzSwitchComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
