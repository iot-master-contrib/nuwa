import {NuwaComponent} from "../../nuwa";
import {NzSelectComponent} from "ng-zorro-antd/select";

export const ControlSelect: NuwaComponent = {
    name: '选择', id: 'select',
    icon: "/assets/widgets/select.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: NzSelectComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
