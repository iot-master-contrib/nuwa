import {HmiComponent} from "../../../hmi/hmi";

export const BaseImage: HmiComponent = {
    name: '图片',
    id: 'image',
    icon: "/assets/widgets/image.svg",
    type: "shape", internal: true,
    extends: {inherit: 'image'},
    meta: {
        width: 100, height: 80,
        imageUrl: "/assets/widgets/image.svg",
    },
    properties: [
        {name: "图片", path: "attrs/image/xlink:href", type: "image"},
    ]
}
