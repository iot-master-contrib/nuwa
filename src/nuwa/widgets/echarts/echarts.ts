import {NuwaComponent} from "../../nuwa";
import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
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
    styles: `:host{width: 100%; height: 100%; display: block}`,
    template: `
        <echarts class="chart"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsComponent {
    chart: any;

    @Input() option: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }

    chartInit(ec: any) {
        this.chart = ec
        console.log(this.elementRef.nativeElement.clientWidth, this.elementRef.nativeElement.clientHeight)
    }

    resize(){
        this.chart.resize()
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const Echarts: NuwaComponent = {
    name: '图表', id: '$echarts',
    icon: "assets/widgets/echarts.svg",
    type: "angular",
    meta: {width: 400, height: 300},
    content: EchartsComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
