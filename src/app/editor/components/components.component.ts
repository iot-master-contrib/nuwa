import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NuwaCollection} from "../../../nuwa/nuwa";
import {RequestService} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'app-components',
    standalone: true,
    imports: [
        CommonModule,
        NzCollapseModule,
    ],
    templateUrl: './components.component.html',
    styleUrl: './components.component.scss'
})
export class ComponentsComponent {
    collections: NuwaCollection[] = []
    @Input() canvas!: CanvasComponent;

    constructor(private rs: RequestService) {
        this.load()
    }

    load() {
        this.rs.get("nuwa/components").subscribe(res => {
            let collections: any = {}
            res.data.forEach((item: any) => {
                let col = item.collection || "未分组"
                if (!collections.hasOwnProperty(col))
                    collections[col] = {name: col, components: []};
                collections[col].components.push(item)
            });
            Object.keys(collections).forEach(col => {
                this.collections.push(collections[col]);
            })
        })
    }

}
