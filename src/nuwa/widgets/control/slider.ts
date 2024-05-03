import {NuwaComponent} from "../../nuwa";
import {NzSliderComponent} from "ng-zorro-antd/slider";

export const ControlSlider: NuwaComponent = {
    name: '滑块', id: 'slider',
    icon: "assets/widgets/slider.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: NzSliderComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
