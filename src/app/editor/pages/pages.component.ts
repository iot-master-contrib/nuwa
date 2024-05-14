import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {Graph} from "@antv/x6";
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {PageSettingComponent} from '../page-setting/page-setting.component';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzContextMenuService} from "ng-zorro-antd/dropdown";
import {NuwaPage, NuwaProject} from "../../../nuwa/project";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
    @Input() project!: NuwaProject;
    @Input() graph!: Graph;


    @Output() onPageChange = new EventEmitter<number>();

    index = 0


    constructor(
        private modal: NzModalService,
        private ms: NzMessageService,
        private viewContainerRef: ViewContainerRef,
        protected menuService: NzContextMenuService
    ) {
    }


    public handleEdit(i?: number) {
        const isNew = i === undefined;
        const modal: NzModalRef = this.modal.create({
            nzTitle: isNew ? '新增页面' : '编辑页面',
            nzContent: PageSettingComponent,
            nzData: {
                row: isNew ? {name: '', content: {}} : this.project.pages[i]
            },
            nzViewContainerRef: this.viewContainerRef,
            nzFooter: [
                {
                    label: '取消',
                    onClick: () => modal.destroy()
                },
                {
                    label: '保存',
                    type: 'primary',
                    onClick: componentInstance => {
                        return componentInstance?.submit().then((page: NuwaPage) => {
                            if (isNew) {
                                this.project.pages.push(page);
                            } else {
                                this.project.pages[i] = page;
                            }
                            this.onPageChange.emit(0);
                            modal.destroy()
                        }).catch((err) => {
                            return false
                        })

                    }
                },
            ]
        });
    }

    handleDel(index: number) {
        if (this.project.pages.length == 1) {
            this.ms.error("再删就没有了")
            return
        }
        this.project.pages.splice(index, 1);
        if (this.index == index) {
            if (index >= this.project.pages.length)
                this.index = index - 1;
            this.onPageChange.emit(this.index);
        }
    }

    open(index: number) {
        this.index = index
        this.onPageChange.emit(index)
    }

    handleCopy(i: number) {
        let page = JSON.parse(JSON.stringify(this.project.pages[i]));
        page.name = page.name + ' - 复制';
        this.project.pages.push(page)
    }

    handleAdd() {
        //this.project.pages.push({})
    }

    openMenu(i: number, $event: MouseEvent) {

    }
}
