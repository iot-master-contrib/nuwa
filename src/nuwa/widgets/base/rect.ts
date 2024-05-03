import {NuwaComponent} from "../../nuwa";
import {StrokeProperties} from "../properties";

export const BaseRect: NuwaComponent = {
    name: '矩形', id: 'rect', icon: "assets/widgets/rect.svg", type: "shape", internal:true,
    meta: { width: 100, height: 40 },
    properties: [
        ...StrokeProperties('rect'),
    ],
    bindings: [
    ],
    hooks: {
    },
}
