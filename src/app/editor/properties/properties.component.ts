import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TransformComponent} from "../transform/transform.component";
import {Cell, Timing} from "@antv/x6";
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {RendererComponent} from "../renderer/renderer.component";
import {ComponentService} from "../../component.service";

@Component({
    selector: 'app-properties',
    standalone: true,
    imports: [
        TransformComponent,
        SmartEditorComponent
    ],
    templateUrl: './properties.component.html',
    styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnDestroy, OnInit {
    @Input() renderer!: RendererComponent;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [];
    data: any = {}

    cell!: Cell

    constructor(private cs: ComponentService) {
        console.log("propertiesComponent", this.renderer);
    }

    ngOnInit() {
        this.renderer.graph.on("cell:selected", this.onCellSelected, this)

        //对于已经选择的情况，直接执行事件
        let cells = this.renderer.graph.getSelectedCells()
        if (cells.length > 0) {
            this.onCellSelected({cell: cells[cells.length - 1]})
        }
    }

    ngOnDestroy(): void {
        this.renderer.graph.off("cell:selected", this.onCellSelected);
    }

    onCellSelected(event: { cell: Cell }) {
        this.cell = event.cell

        // this.cell.transition("attrs/line/strokeWidth", 20, {
        //     timing: Timing.linear,
        // })
        //
        // this.cell.transition("attrs/line/strokeDashoffset", 5, {
        //     timing: Timing.linear,
        // })

        //console.log("onCellSelected", event.cell);
        let id = event.cell.shape
        let component = this.cs.Get(id)

        //表单
        this.fields = component.properties || []

        //数据
        let data: any = {}
        this.fields.forEach(f => {
            let val = event.cell.getPropByPath(f.key)
            //console.log("properties get default", f.key, val)
            if (val !== undefined)
                data[f.key] = val
        })
        this.data = data

        this.ngAfterViewInit()
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.editor.group.valueChanges.subscribe(res => {
                //console.log("properties change", res)
                //Object.assign(this.page, res)
                Object.keys(res).forEach(key => {
                    this.cell.setPropByPath(key, res[key])
                })
            })
        }, 100)
    }


}
