import {NuwaComponent} from "../../nuwa";
import {DefaultEvents, RadiusProperties, StrokeProperties} from "../properties";

export const BaseImage: NuwaComponent = {
    name: '图片',
    id: 'image',
    icon: "assets/widgets/image.svg",
    type: "shape", internal: true,
    extends: {inherit: 'image'},
    events: [
        ...DefaultEvents,
    ],
    metadata: {
        width: 100, height: 80,
        imageUrl: "assets/widgets/image.svg",
    },
    properties: [
        {label: "图片", key: "attrs/image/xlink:href", type: "file"},
    ]
}
