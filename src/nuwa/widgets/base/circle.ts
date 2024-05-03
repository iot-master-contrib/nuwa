import {StrokeProperties} from "../properties";
import {NuwaComponent} from "../../nuwa";

export const BaseCircle: NuwaComponent = {
    name: '圆形', id: 'circle',
    icon: "assets/widgets/circle.svg",
    type: "shape", internal: true,
    meta: {width: 100, height: 100},
    properties: [
        ...StrokeProperties('circle'),
    ],
    bindings: [
    ],
    hooks: {
    },
}
