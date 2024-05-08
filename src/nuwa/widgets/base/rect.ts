import {NuwaComponent} from "../../nuwa";
import {radiusProperties, StrokeProperties} from "../properties";

export const BaseRect: NuwaComponent = {
    name: '矩形', id: 'rect', icon: "assets/widgets/rect.svg",
    type: "shape", internal:true,
    metadata: { width: 100, height: 40 },
    properties: [
        ...StrokeProperties('rect'),
        ...radiusProperties('rect'),
    ],
    bindings: [
    ],
    hooks: {
    },
}
