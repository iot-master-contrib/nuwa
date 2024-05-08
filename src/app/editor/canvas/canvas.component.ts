import {Component, ElementRef, Injector, Input} from '@angular/core';

import {Edge, FunctionExt, Graph, Node, Shape} from '@antv/x6';

import {Transform} from "@antv/x6-plugin-transform";
import {Snapline} from "@antv/x6-plugin-snapline";
import {Clipboard} from "@antv/x6-plugin-clipboard";
import {Keyboard} from "@antv/x6-plugin-keyboard";
import {History} from "@antv/x6-plugin-history";
import {Selection} from "@antv/x6-plugin-selection";
import {Export} from "@antv/x6-plugin-export";
import {Dnd} from "@antv/x6-plugin-dnd";

import {HmiPage} from "../../../hmi/hmi";

import {ComponentService} from "../../component.service";
import {NuwaComponent, NuwaPage} from "../../../nuwa/nuwa";

import {register} from '@antv/x6-angular-shape'
import {NzNotificationService} from "ng-zorro-antd/notification";


@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {

    _page!: NuwaPage

    @Input() set page(page: NuwaPage) {
        this._page = page
        this.render(page) //渲染
    }

    get page(): NuwaPage {
        return this._page
    }

    public graph: Graph;

    dnd: Dnd;

    edge: Edge | undefined;

    constructor(
        private cs: ComponentService,
        private ns: NzNotificationService,
        private injector: Injector,
        element: ElementRef,
    ) {

        this.graph = new Graph({
            container: element.nativeElement,
            background: {
                //color: graphBgc.color, // 设置画布背景颜色
                //color: "#F20FF0"
            },
            grid: {
                size: 10,      // 网格大小 10px
                visible: JSON.parse(localStorage.getItem("nuwa-editor-grid") || 'true'), // 渲染网格背景
                //type: "mesh",
                type: "fixedDot"
            },
        });

        //补充插件
        this.graph.use(new Export());
        this.graph.use(new Keyboard({enabled: true}));
        this.graph.use(new Transform({resizing: true, rotating: true}));
        this.graph.use(new Snapline({enabled: true}))
        this.graph.use(new Clipboard({enabled: true}))
        this.graph.use(new History({enabled: true}));
        this.graph.use(new Selection({//选中
            enabled: true,
            multiple: true,
            rubberband: true,
            rubberEdge: true,
            movable: true,
            strict: true,
            showNodeSelectionBox: true
        }));


        // this.graph.use(new Scroller({
        //     enabled: true,
        //     pannable: true,
        //     pageVisible: true,
        //     pageBreak: true,
        //     autoResize: false,
        // }))

        //拖放插件，用于创建新图形
        this.dnd = new Dnd({target: this.graph});

        this.graph.bindKey('ctrl+s', (e) => {
            this.graph.exportPNG();
            e.preventDefault()
        })

        //快捷键
        this.graph.bindKey('ctrl+z', () => this.graph.undo())
        this.graph.bindKey('ctrl+y', () => this.graph.redo())
        this.graph.bindKey('ctrl+x', () => this.graph.cut(this.graph.getSelectedCells(), {deep: true}))
        this.graph.bindKey('ctrl+c', () => this.graph.copy(this.graph.getSelectedCells(), {deep: true}))
        this.graph.bindKey('ctrl+v', () => this.graph.resetSelection(this.graph.paste()))
        this.graph.bindKey('backspace', () => this.graph.getSelectedCells().forEach(cell => cell.remove()))
        this.graph.bindKey('delete', () => this.graph.getSelectedCells().forEach(cell => cell.remove()))

        this.graph.bindKey("escape", () => {
            if (this.drawingEdge) {
                //this.drawingEdge.remove()
                this.drawingEdge = undefined
            }
        })

        //绘线
        this.graph.container.onclick = (event) => {
            if (this.drawingEdgeComponent) {
                //console.log("draw line on click")
                this.drawingEdge = this.graph.addEdge({
                    shape: this.drawingEdgeComponent.id,
                    source: [event.offsetX, event.offsetY],
                    target: [event.offsetX + 10, event.offsetY + 10],
                    ...this.drawingEdgeComponent.metadata
                });
                this.drawingEdgeComponent = undefined;
            } else {
                this.drawingEdge = undefined
            }
        }

        this.graph.container.onmousemove = (event) => {
            if (this.drawingEdge) {
                //console.log("draw line on move")
                this.drawingEdge.setTerminal("target", {x: event.offsetX, y: event.offsetY})
            }
        }

        //线段编辑
        this.graph.on('edge:selected', FunctionExt.debounce(({edge}) => {
            edge.addTools([{name: 'source-arrowhead'}, {name: 'target-arrowhead'}, {name: 'vertices'}, {name: 'segments'}])
        }))

        this.graph.on('edge:unselected', ({cell}) => {
            cell.removeTools();
        })

    }

    render(page: HmiPage) {
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.cs.Get(cell.shape)
            //TODO 使用filter 过滤掉找不到组件的情况

        })
        this.graph.drawBackground({
            color: page.background_color,
            image: page.background_image,
        })
        this.graph.fromJSON(page.content)
    }


    drawingEdgeComponent?: NuwaComponent
    drawingEdge?: Edge

    drawEdge(component: NuwaComponent) {
        this.drawingEdgeComponent = undefined

        //检查是否已经注册
        if (!this.checkRegister(component)) {
            //TODO 报错
            return;
        }

        if (component.type == "line") {
            this.drawingEdgeComponent = component;
            return
        }
    }

    drawNode($event: DragEvent, component: NuwaComponent) {
        let node!: Node

        //检查是否已经注册
        if (!this.checkRegister(component)) {
            //this.ns.error("错误", "未注册"+component.name)
            return;
        }

        if (component.type == "line") {
            this.ns.error("错误", "线条不能拖放")
            return
        }

        //参数
        let data: any = {}
        component.bindings?.forEach(b => data[b.name] = b.default)

        //创建节点
        node = this.graph.createNode({
            shape: component.id,
            ...component.metadata,
            data: data,
        })

        this.dnd.start(node, $event);
    }


    checkRegister(component: NuwaComponent): boolean {
        if (component.registered || component.internal)
            return true
        component.registered = true

        switch (component.type) {
            case "line":
                //注册线
                if (component.extends) {
                    Graph.registerEdge(component.id, component.extends)
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少extends")
                break
            case "shape":
                //注册衍生组件
                if (component.extends) {
                    Graph.registerNode(component.id, component.extends)
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少extends")
                break;
            case "html":
                // @ts-ignore
                Shape.HTML.register({
                    shape: component.id,
                    width: component.metadata?.width || 100,
                    height: component.metadata?.height || 100,
                    // @ts-ignore
                    html: component.html,
                })
                break;
            case "angular":
                if (component.content) {
                    register({
                        shape: component.id,
                        width: component.metadata?.width || 100,
                        height: component.metadata?.height || 100,
                        content: component.content,
                        injector: this.injector,
                    })
                    component.registered = true
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少content")
                break;
        }
        return false
    }

}
