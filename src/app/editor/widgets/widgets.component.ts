import { Component } from '@angular/core';
import {NuwaWidgets} from "../../../nuwa/widgets/widgets";

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
    widgets = NuwaWidgets
}
