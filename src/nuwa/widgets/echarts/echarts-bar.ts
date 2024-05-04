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
    styles: `:host{width: 100%; height: 100%; display: block}`,
    template: `
        <echarts class="chart"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option()" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsBarComponent {
    chart: any;

    @Input() xAxis: string[] = ['一', '二', '三', '四', '五', '六', '七']
    @Input() yAxis: number[] = [100, 110, 120, 130, 120, 110, 100]

    option(): EChartsOption {
        return {
            xAxis: {
                type: 'category',
                    data: this.xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.yAxis,
                    type: 'bar'
                }
            ]
        }
    }

    chartInit(ec: any) {
        this.chart = ec
    }

    resize(){
        this.chart.resize()
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const EchartsBar: NuwaComponent = {
    name: '柱状图', id: '$echarts-bar',
    icon: "assets/widgets/echarts-bar.svg",
    type: "angular",
    meta: {width: 400, height: 300},
    content: EchartsBarComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
