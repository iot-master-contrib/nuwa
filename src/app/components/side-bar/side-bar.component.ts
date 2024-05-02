import {
    Component,
    ContentChildren,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
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
export class SideBarComponent{
    @ContentChildren(SideBarItemComponent, {descendants: true}) components!: QueryList<SideBarItemComponent>

    @HostBinding("style.width") styleWidth = "200px";
    @HostBinding("style.flex-direction") styleFlexDirection = "row";

    //右对齐
    _right = false;

    @Input() set right(p: boolean) {
        this._right = p
        this.styleFlexDirection = p ? "row-reverse" : "row";
    }


    //宽度
    _width = 200

    @Input() set width(w: number) {
        this._width = w
        this.styleWidth = w + "px"
    }

    index = 0;

    onClick(i: number) {
        if (this.index == i) {
            this.index = -1
            this.styleWidth = "auto"
        } else {
            this.index = i
            this.width = this._width
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
        let dx = $event.screenX - this.lastX;
        let w = (this._right) ? this._width - dx : this._width + dx
        if (w > 50)
            this.width = w
        this.lastX = $event.screenX
    }

    @HostListener("window:mouseup", ["$event"])
    onMouseUp($event: MouseEvent) {
        this.splitting = false
    }
}
