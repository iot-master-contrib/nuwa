import {NuwaComponent} from "../../nuwa";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";

export const ControlInput: NuwaComponent = {
    name: '输入框', id: 'input',
    icon: "assets/widgets/input.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: NzInputNumberComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
