import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsLineComponent {

}

export const EchartsLine: NuwaComponent = {
    name: '折线图', id: 'echarts-line',
    icon: "assets/widgets/echarts-line.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: EchartsLineComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
