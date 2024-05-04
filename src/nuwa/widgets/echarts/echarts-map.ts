import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsMapComponent {

}

export const EchartsMap: NuwaComponent = {
    name: '地图', id: '$echarts-map',
    icon: "assets/widgets/echarts-map.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: EchartsMapComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
