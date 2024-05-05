import {Component, Input} from '@angular/core';
import {Cell, Graph} from "@antv/x6";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ComponentService} from "../../component.service";
import {CommonModule} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";

@Component({
  selector: 'app-transform',
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputDirective,
        NzInputNumberComponent
    ],
  templateUrl: './transform.component.html',
  styleUrl: './transform.component.scss'
})
export class TransformComponent {

    selected: Cell[] = [];

    cell?: Cell

    form!: FormGroup;

    private g!: Graph;

    get graph() {
        return this.g;
    }

    @Input() set graph(g: Graph) {
        this.g = g;

        g.on("cell:change:size", (event) => {
            if (event.cell == this.cell) {
                this.form.patchValue(event.current as any)
            }
        })

        g.on("cell:change:position", (event) => {
            if (event.cell == this.cell)
                this.form.patchValue(event.current as any)
        })

        //TODO 此处无效
        g.on("cell:change:angle", (event) => {
            if (event.cell == this.cell)
                this.form.patchValue(event.current as any)
        })

        g.on("cell:unselected", ({ cell }) => {
            if (cell == this.cell) {
                //this.cmp = undefined;
            }
        })

        g.on("selection:changed", ({ selected }) => {
            this.selected = selected;
            if (g.getSelectedCellCount() === 1) {
                this.cell = g.getSelectedCells()[0]

                if (this.cell.isNode()) {
                    const pos = this.cell.getPosition()
                    const size = this.cell.getSize()
                    const angle = this.cell.getAngle()

                    this.form.patchValue(pos)
                    this.form.patchValue(size);
                    this.form.patchValue({angle});
                }
            } else {
                this.cell = undefined
            }
        })
    }

    constructor(private fb: FormBuilder, private cs: ComponentService) {
        this.form = fb.group({
            x: [0, [Validators.required]],
            y: [0, [Validators.required]],
            width: [0, [Validators.required]],
            height: [0, [Validators.required]],
            angle: [0, [Validators.required]],
        })
    }

    onChange($event: Event) {
        //console.log("onPositionChange", this.formPosition.value)
        if (this.cell?.isNode()) {
            this.cell.setPosition(this.form.value)
            this.cell.setSize(this.form.value)
            this.cell.angle(this.form.value.angle)

        }
    }
}
