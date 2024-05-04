import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'nuwa-control-input',
    standalone: true,
    imports: [
        CommonModule,
        NzInputDirective,
        FormsModule,
    ],
    styles: `input {
        width: 100%;
        height: 100%
    }`,
    template: `<input nz-input [(ngModel)]="value" [ngModelOptions]="{standalone: true}" [type]="type"
                      [placeholder]="placeholder" (change)="onChange($event)">`
})
class ControlInputComponent {
    @Input() value: any
    @Input() type = ""
    @Input() placeholder = ""

    //TODO 事件
    onChange($event: Event) {

    }
}

export const ControlInput: NuwaComponent = {
    name: '输入框', id: '$input',
    icon: "assets/widgets/input.svg",
    type: "angular",
    meta: {width: 100, height: 40},
    content: ControlInputComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
