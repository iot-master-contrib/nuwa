import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsBarComponent {

}

export const EchartsBar: NuwaComponent = {
    name: '柱状图', id: 'echarts-bar',
    icon: "/assets/widgets/echarts-bar.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: EchartsBarComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
