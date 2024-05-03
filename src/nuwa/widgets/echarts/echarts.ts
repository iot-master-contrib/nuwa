import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsComponent {

}

export const Echarts: NuwaComponent = {
    name: '图表', id: 'echarts',
    icon: "/assets/widgets/echarts.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: EchartsComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
