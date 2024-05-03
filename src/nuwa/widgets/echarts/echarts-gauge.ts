import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsGaugeComponent {

}

export const EchartsGauge: NuwaComponent = {
    name: '仪表盘', id: 'echarts-gauge',
    icon: "/assets/widgets/echarts-gauge.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: EchartsGaugeComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
