import {NuwaComponent} from "../../nuwa";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
    selector: 'nuwa-control-progress',
    standalone: true,
    imports: [
        CommonModule,
        NzProgressComponent,
    ],
    styles: `nz-progress {
        width: 100%;
    }`,
    template: `<nz-progress [nzPercent]="percent"></nz-progress>`
})
class ControlProgressComponent {
    @Input() percent = 60
}


export const ControlProgress: NuwaComponent = {
    name: '进度条', id: '$progress',
    icon: "assets/widgets/progress.svg",
    type: "angular",
    meta: {width: 100, height: 30},
    content: ControlProgressComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
