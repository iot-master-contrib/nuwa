import {NuwaComponent} from "../../nuwa";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'nuwa-control-switch',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzSwitchComponent,
    ],
    styles: `nz-switch {
        width: 100%;
        height: 100%;
    }`,
    template: `
        <nz-switch [(ngModel)]="value" [ngModelOptions]="{standalone:true}"
                   (change)="onChange($event)"></nz-switch>`
})
class ControlSwitchComponent {
    @Input() value = 60

    //TODO 事件
    onChange($event: Event) {

    }
}
export const ControlSwitch: NuwaComponent = {
    name: '开关', id: '$switch',
    icon: "assets/widgets/switch.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlSwitchComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
