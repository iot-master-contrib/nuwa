import {Component, ContentChildren, HostBinding, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
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

    //右对齐
    _right = false;

    @Input() set Right(p: boolean) {
        this._right = p
        this.direction = p ? "row-reverse" : "row";
    }

    @HostBinding("style.flex-direction") direction = "row";

    //宽度
    _width = 200

    @Input() set Width(w: number) {
        this._width = w
        this.width = w + "px"
    }

    @HostBinding("style.width") width = "200px";


    last = -1;

    onClick(i: number) {
        console.log("side bar on click", i)
        if (this.last > -1) {
            // @ts-ignore
            this.components.get(this.last).Activated = false
        }
        if (this.last == i) {
            this.last = -1
        } else {
            // @ts-ignore
            this.components.get(i).Activated = true
            this.last = i
        }
    }

    splitting = false;
    lastX = 0;

    onSplit($event: MouseEvent) {
        this.splitting = true
        this.lastX = $event.screenX
    }

    @HostListener("window:mousemove", ["$event"])
    onMouseMove($event: MouseEvent) {
        if (!this.splitting) return;
        if (this._right)
            this.Width = this._width - $event.screenX + this.lastX;
        else
            this.Width = this._width + $event.screenX - this.lastX;
        this.lastX = $event.screenX
    }


    @HostListener("window:mouseup", ["$event"])
    onMouseUp($event: MouseEvent) {
        this.splitting = false
    }
}
