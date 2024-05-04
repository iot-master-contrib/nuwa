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
    template: `
        <button type="button" nz-button>{{ text }}</button>`
})
class ControlButtonComponent {
    @Input() text = "按钮"
    //TODO 事件
}

export const ControlButton: NuwaComponent = {
    name: '按钮', id: '$button',
    icon: "assets/widgets/button.svg",
    type: "angular",
    meta: {width: 100, height: 40},
    content: ControlButtonComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
