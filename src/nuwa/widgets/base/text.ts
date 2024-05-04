import {NuwaComponent} from "../../nuwa";
import {StrokeProperties, TextProperties} from "../properties";

export const BaseText: NuwaComponent = {
    name: '文本', id: '$text',
    icon: "assets/widgets/text.svg",
    type: "shape",
    extends: {inherit: "rect"},
    metadata: {
        width: 100,
        height: 30,
        attrs: {
            rect: {
                fill: 'none',
                stroke: 'none',
                strokeWidth: 2
            },
            text: {text: '文本框'},
        }
    },
    properties: [
        ...TextProperties,
        ...StrokeProperties('rect'),
    ],
    bindings: [],
    hooks: {},
}
