import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import { NzCollapseModule} from "ng-zorro-antd/collapse";
import {RequestService} from "iot-master-smart";

@Component({
  selector: 'app-galleries',
  standalone: true,
    imports: [
        CommonModule,
        NzCollapseModule,
    ],
  templateUrl: './galleries.component.html',
  styleUrl: './galleries.component.scss'
})
export class GalleriesComponent {
    galleries: any = []

    constructor(private rs: RequestService) {
        this.load()
    }

    load() {
        this.rs.get("galleries").subscribe(res => {
            this.galleries = res.data;
        })
    }

}
