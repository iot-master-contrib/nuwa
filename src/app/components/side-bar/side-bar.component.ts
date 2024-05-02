import {Component, ContentChildren, QueryList, ViewChildren} from '@angular/core';
import {SideBarItemComponent} from "../side-bar-item/side-bar-item.component";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    @ContentChildren(SideBarItemComponent, {descendants: true}) components!: QueryList<SideBarItemComponent>

}
