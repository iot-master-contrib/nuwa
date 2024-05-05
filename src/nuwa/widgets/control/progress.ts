import {NuwaComponent} from "../../nuwa";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
    selector: 'nuwa-control-progress',
    standalone: true,
    imports: [
        CommonModule,
        NzProgressComponent,
    ],
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        nz-progress {
            width: 100%;
            height: 100%;
        }`,
    template: `<nz-progress [nzPercent]="percent" [nzShowInfo]="false" [nzStrokeColor]="color"
                            [nzStrokeWidth]="elementRef.nativeElement.clientHeight || 10"
                            nzStrokeLinecap="square"></nz-progress>`
})
class ControlProgressComponent {
    @Input() percent = 60
    @Input() color = "#6992ff"
    constructor(protected elementRef: ElementRef) {
    }
}


export const ControlProgress: NuwaComponent = {
    name: '进度条', id: '$progress',
    icon: "assets/widgets/progress.svg",
    type: "angular",
    metadata: {width: 100, height: 30},
    content: ControlProgressComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
