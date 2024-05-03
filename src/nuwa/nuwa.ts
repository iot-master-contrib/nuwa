import {Cell, Edge, Node} from "@antv/x6";
import {SmartField} from "iot-master-smart";

export declare interface NuwaProject {
    id: string
    name: string
    description: string
    pages: NuwaPage[]
}

export declare interface NuwaPage {
    name: string
    content: any
    width: number
    height: number
    background_color?: string
    background_image?: string
}


export declare interface NuwaBinding {
    name: string
    label: string
    type?: string
    default?: any
}

export declare interface NuwaEvent {
    name: string
    label: string
}

export declare interface NuwaComponent {
    id: string

    name: string

    icon?: string

    type: "line" | "shape" | "html" | "svg" | "chart"

    internal?: boolean

    extends?: Node.Properties | Edge.Properties //继承 shape 或 edge

    meta?: Node.Metadata | Edge.Metadata

    //Angular组件
    //content?: any //Component

    //html组件
    effects?: string[]
    html?: ((cell: Cell) => void) | string

    //是否已经注册
    registered?: boolean

    //配置属性
    properties?: SmartField[]

    //开放的数据绑定
    bindings?: NuwaBinding[]

    //数据绑定的钩子
    hooks?: { [name: string]: ((cell: Cell, value: any) => void) | string }

    //开放的事件
    events?: NuwaEvent[]

    //animations?:

    //事件响应
    listeners?: { [event: string]: ((cell: Cell, event?: any, emitter?: any) => void) | string }

    //集合名
    collection?: string
}


export declare interface NuwaCollection {
    name: string
    components: NuwaComponent[]
}
