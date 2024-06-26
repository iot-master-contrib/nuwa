import {NuwaComponent} from "../../nuwa";
import {LineProperties} from "../properties";
import {LineSvg} from "./line_svg";

export const BaseLine: NuwaComponent = {
    name: '线条', id: ':line:',
    svg: LineSvg, //icon: "assets/widgets/line.svg",
    type: "line", extends: {inherit: "edge"}, //TODO 不用继承就好了
    metadata: {
        markup: [
            {tagName: 'path', selector: 'wrap'},
            {tagName: 'path', selector: 'line'},
        ],
        attrs: {
            wrap: {
                fill: 'none',
                connection: true,
                stroke: '#ccc',
                strokeWidth: 0,
                strokeLinejoin: 'round',
            },
            line: {
                fill: 'none',
                connection: true,
                stroke: '#000',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                targetMarker: null,
            },
        },
        tools: {items: ['edge-editor']},
    },
    properties: [
        ...LineProperties('line'),
    ],
    bindings: [],
    hooks: {},
}
