import {NuwaComponent} from "../../nuwa";
import {NzProgressComponent} from "ng-zorro-antd/progress";

export const ControlProgress: NuwaComponent = {
    name: '进度条', id: '$progress',
    icon: "assets/widgets/progress.svg",
    type: "angular",
    meta: {width: 100, height: 40},
    content: NzProgressComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
