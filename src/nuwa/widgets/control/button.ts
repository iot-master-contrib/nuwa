import {NuwaComponent} from "../../nuwa";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents} from "../properties";
import {CircleSvg} from "../base/circle_svg";
import {ButtonSvg} from "./button_svg";

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
        <button type="button" nz-button
                [style.font-size]="fontSize+'px'"
                (click)="onClick($event)">{{ text }}</button>`
})
class ControlButtonComponent {
    @Input() text = "按钮"
    @Input() fontSize = 16

    //TODO 事件
    onClick($event: MouseEvent) {

    }
}

export const ControlButton: NuwaComponent = {
    name: '按钮', id: ':button:',
    svg: ButtonSvg, //icon: "assets/widgets/button.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlButtonComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        {label: "字号", key: "data/ngArguments/fontSize", type: "number", min: 0, max: 255, default: 16},
    ],
    bindings: [],
    hooks: {},
}
