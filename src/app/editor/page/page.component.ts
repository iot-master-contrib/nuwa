import {AfterContentInit, AfterViewInit, Component, ContentChild, Input, OnInit, ViewChild} from '@angular/core';
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
export class PageComponent implements AfterViewInit{
    @Input() page!: HmiPage;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'width', label: '宽度', type: 'number'},
        {key: 'height', label: '高度', type: 'number'},
    ];

    ngAfterViewInit() {
        setTimeout(()=>{
            this.editor.group.valueChanges.subscribe(res=>{
                //console.log("dddd", res)
                Object.assign(this.page, res)
            })
        }, 100)
    }

}
