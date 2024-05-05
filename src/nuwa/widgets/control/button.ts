import {NuwaComponent} from "../../nuwa";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'nuwa-control-button',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
    ],
    styles: `button {
        width: 100%;
        height: 100%
    }`,
    template: `
        <button type="button" nz-button (click)="onClick($event)">{{ text }}</button>`
})
class ControlButtonComponent {
    @Input() text = "按钮"
    //TODO 事件
    onClick($event: MouseEvent) {

    }
}

export const ControlButton: NuwaComponent = {
    name: '按钮', id: '$button',
    icon: "assets/widgets/button.svg",
    type: "angular",
    metadata: {width: 100, height: 30},
    content: ControlButtonComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
