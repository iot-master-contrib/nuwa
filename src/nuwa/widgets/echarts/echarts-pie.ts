import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsPieComponent {

}

export const EchartsPie: NuwaComponent = {
    name: '饼图', id: '$echarts-pie',
    icon: "assets/widgets/echarts-pie.svg",
    type: "angular",
    meta: {width: 100, height: 40},
    content: EchartsPieComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
