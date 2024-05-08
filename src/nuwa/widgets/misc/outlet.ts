import {NuwaComponent} from "../../nuwa";
import {RenderComponent} from "../../../app/render/render.component";

export const MiscOutlet: NuwaComponent = {
    name: '子页面入口', id: '$outlet',
    icon: "assets/widgets/outlet.svg",
    type: "angular",
    metadata: {width: 300, height: 200, tools: ['boundary']},
    content: RenderComponent,
    properties: [
        //{key:"data/ngArguments/page", label: "URL", type: "text"},
        {key:"data/name", label: "名称", type: "text", default: "新建子页面入口"},
    ],
    bindings: [],
    hooks: {},
}
