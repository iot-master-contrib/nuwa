import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SideBarComponent} from "../side-bar/side-bar.component";

@Component({
    selector: 'app-side-bar-item',
    templateUrl: './side-bar-item.component.html',
    styleUrl: './side-bar-item.component.scss'
})
export class SideBarItemComponent {
    @Input() Title = 'tab'

    constructor(public parent: SideBarComponent) {
    }

    active(): boolean {
        return this === this.parent.components.get(this.parent.index)
    }
}
