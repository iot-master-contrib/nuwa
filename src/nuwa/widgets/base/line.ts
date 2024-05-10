import {NuwaComponent} from "../../nuwa";
import {StrokeProperties} from "../properties";

export const BaseLine: NuwaComponent = {
    name: '线条', id: ':line:',
    icon: "assets/widgets/line.svg", type: "line",
    extends: {
        inherit: "edge",
        markup: [
            {
                tagName: 'path',
                selector: 'line',
                attrs: {
                    fill: 'none',
                    cursor: 'move',
                    pointerEvents: 'none',
                },
            },
            {
                tagName: 'path',
                selector: 'wrap',
                attrs: {
                    fill: 'none',
                    cursor: 'move',
                    stroke: 'transparent',
                    strokeLinecap: 'round',
                },
            },
        ],
        attrs: {
            wrap: {
                connection: true,
                strokeWidth: 10,
                strokeLinejoin: 'round',
            },
            line: {
                connection: true,
                stroke: '#000',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                targetMarker: null,
            },
        },
        tools: {items: ['edge-editor']},
    },
    metadata: {},
    properties: [
        ...StrokeProperties('line'),
    ],
    bindings: [],
    hooks: {},
}
