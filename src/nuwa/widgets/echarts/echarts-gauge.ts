import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";


@Component({
    selector: 'app-echarts-bar',
    standalone: true,
    imports: [
        CommonModule,
        NgxEchartsModule,
    ],
    styles: `:host {
        width: 100%;
        height: 100%;
        display: block
    }`,
    template: `
        <echarts class="chart"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option()" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsGaugeComponent {
    chart: any;

    @Input() name = ''
    @Input() value = 30

    option(): EChartsOption {
        return {
            series: [
                {
                    type: 'gauge',
                    progress: {show: true},
                    axisTick: {show: false}, //小刻度
                    data: [
                        {value: this.value}
                    ]
                }
            ]
        }
    }

    chartInit(ec: any) {
        this.chart = ec
    }

    resize() {
        this.chart.resize()
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const EchartsGauge: NuwaComponent = {
    name: '仪表盘', id: '$echarts-gauge',
    icon: "assets/widgets/echarts-gauge.svg",
    type: "angular",
    metadata: {width: 300, height: 300},
    content: EchartsGaugeComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
