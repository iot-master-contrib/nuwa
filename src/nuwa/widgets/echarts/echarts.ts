import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";

@Component({
    selector: 'app-echarts',
    standalone: true,
    imports: [
        CommonModule,
        NgxEchartsModule,
    ],
    template: `
        <echarts class="chart"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsComponent {
    chart: any;

    @Input() option: EChartsOption = {}

    chartInit(ec: any) {
        this.chart = ec
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const Echarts: NuwaComponent = {
    name: '图表', id: 'echarts',
    icon: "assets/widgets/echarts.svg",
    type: "angular", internal: true,
    meta: {width: 100, height: 40},
    content: EchartsComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
