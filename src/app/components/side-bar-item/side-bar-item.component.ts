import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-item.component.html',
  styleUrl: './side-bar-item.component.scss'
})
export class SideBarItemComponent {
    @Input() Title: string = 'tab'

}
