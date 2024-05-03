import {StrokeProperties} from "../properties";
import {NuwaComponent} from "../../nuwa";

export const BaseEllipse: NuwaComponent = {
    name: '椭圆', id: 'ellipse',
    icon: "/assets/widgets/ellipse.svg", type: "shape",
    internal:true,
    meta: {width: 100, height: 60},
    properties: [
        ...StrokeProperties('ellipse'),
    ],
    bindings: [
    ],
    hooks: {
    },
}
