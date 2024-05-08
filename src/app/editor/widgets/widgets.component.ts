import {Component, Input} from '@angular/core';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {CommonModule} from "@angular/common";
import {NuwaWidgets} from "../../../nuwa/widgets/widgets";
import {NuwaComponent} from "../../../nuwa/nuwa";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'app-widgets',
    standalone: true,
    imports: [
        CommonModule,
        NzCollapseModule,
    ],
    templateUrl: './widgets.component.html',
    styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
    widgets = NuwaWidgets

    @Input() renderer!: CanvasComponent;

    onDragStart($event: DragEvent, component: NuwaComponent) {
        this.renderer?.drawNode($event, component)
    }

    onClick(c: NuwaComponent) {
        this.renderer?.drawEdge(c)
    }
}
