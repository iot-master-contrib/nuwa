import { Component } from '@angular/core';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {CommonModule} from "@angular/common";
import {NuwaWidgets} from "../../../nuwa/widgets/widgets";

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
    widgets =  NuwaWidgets
}
