import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-side-bar-item',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './side-bar-item.component.html',
    styleUrl: './side-bar-item.component.scss'
})
export class SideBarItemComponent {
    @Input() Title = 'tab'
    @Input() Activated = false

}
