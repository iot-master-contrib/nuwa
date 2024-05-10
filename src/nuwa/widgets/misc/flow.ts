import {NuwaComponent} from "../../nuwa";
import {StrokeProperties} from "../properties";

export const MiscFlow: NuwaComponent = {
    name: '流动线条', id: ':flow:',
    icon: "assets/widgets/line.svg", type: "line",
    extends: {inherit: "edge"},
    metadata: {
        markup: [
            {tagName: 'path', selector: 'wrap'},
            {tagName: 'path', selector: 'line'},
        ],
        attrs: {
            wrap: {
                fill: 'none',
                connection: true,
                stroke: '#63baff',
                strokeWidth: 10,
                strokeLinejoin: 'round',
            },
            line: {
                fill: 'none',
                connection: true,
                stroke: '#02207a',
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
        ...StrokeProperties('wrap', "底"),
        ...StrokeProperties('line'),
        {
            label: "边框动画", key: `attrs/line/style/animation`, type: "select", default: '', options: [
                {value: "", label: "无"},
                {value: "line-flow-animation 100s infinite linear", label: "慢"},
                {value: "line-flow-animation 50s infinite linear", label: "正常"},
                {value: "line-flow-animation 30s infinite linear", label: "快"},
                {value: "line-flow-animation 10s infinite linear", label: "加快"},
                {value: "line-flow-animation 5s infinite linear", label: "极快"},
            ]
        },
    ],
    bindings: [],
    hooks: {},
}