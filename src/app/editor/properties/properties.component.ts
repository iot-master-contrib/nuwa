import {Component, Input} from '@angular/core';
import {TransformComponent} from "../transform/transform.component";
import {Graph} from "@antv/x6";

@Component({
  selector: 'app-properties',
  standalone: true,
    imports: [
        TransformComponent
    ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent {
    @Input() graph!: Graph;

}
