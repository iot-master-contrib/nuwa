import {NuwaComponent} from "../../nuwa";
import {StrokeProperties} from "../properties";

export const MiscFlow: NuwaComponent = {
    name: '流动线条', id: ':flow:',
    icon: "assets/widgets/line.svg", type: "line",
    extends: {inherit: "edge",},
    metadata: {
        markup: [
            {tagName: 'path', selector: 'wrap'},
            {tagName: 'path', selector: 'line'},
        ],
        attrs: {
            wrap: {
                fill: 'none',
                connection: true,
                stroke: '#f0f0f0',
                strokeWidth: 10,
                strokeLinejoin: 'round',
            },
            line: {
                fill: 'none',
                connection: true,
                stroke: '#000',
                strokeWidth: 6,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
                strokeDasharray: '10 10',
                targetMarker: null,
            },
        },
        tools: {items: ['edge-editor']},
    },
    properties: [
        ...StrokeProperties('wrap'),
        ...StrokeProperties('line'),
    ],
    bindings: [],
    hooks: {},
}
