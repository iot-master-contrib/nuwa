import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {HmiPage} from "../../../hmi/hmi";

@Component({
  selector: 'app-page',
  standalone: true,
    imports: [
        SmartEditorComponent
    ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements AfterContentInit{
    @Input() page!: HmiPage;

    @ContentChild(SmartEditorComponent) editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'width', label: '宽度', type: 'number'},
        {key: 'height', label: '高度', type: 'number'},
    ];

    ngAfterContentInit() {
        //this.editor.patchValue(this.page)
    }
}
