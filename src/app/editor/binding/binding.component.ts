import { Component, Input } from '@angular/core';
import { Cell } from "@antv/x6";
import { NzModalService } from "ng-zorro-antd/modal";
import { BindingSettingComponent } from "../binding-setting/binding-setting.component";
import {NuwaComponent} from "../../../nuwa/nuwa";

@Component({
    selector: 'app-binding',
    templateUrl: './binding.component.html',
    styleUrls: ['./binding.component.scss']
})
export class BindingComponent {
    @Input() cell!: Cell
    @Input() component!: NuwaComponent

    constructor(private ms: NzModalService) {
    }

    edit(e: any) {
        this.cell.data.bindings ||= {}
        this.ms.create({
            nzTitle: `编辑 ${e.label} 数据绑定`,
            nzContent: BindingSettingComponent,
            nzData: {
                content: this.cell.data.bindings[e.name] || {}
            },
            nzOnOk: ({ group }) => {
                //const bindings = this.cell.data.bindings || {};
                this.cell.data.bindings[e.name] = group.value
            }
        })
        //TODO OK中，回传 至 cell.data.bindings[e.name]
    }

}
