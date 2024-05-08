import {Component, ElementRef, Injector, Input, ViewContainerRef} from '@angular/core';

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
import {NzModalService} from 'ng-zorro-antd/modal';
import {NuwaComponent, NuwaPage} from "../../../nuwa/nuwa";

import {register} from '@antv/x6-angular-shape'


@Component({
    selector: 'app-renderer',
    templateUrl: './renderer.component.html',
    styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent {
    @Input() page!: NuwaPage

    public graph: Graph;

    dnd: Dnd;

    edge: Edge | undefined;

    constructor(
        private cs: ComponentService,
        private element: ElementRef,
        private injector: Injector
    ) {

        this.graph = new Graph({
            container: element.nativeElement,
            background: {
                //color: graphBgc.color, // 设置画布背景颜色
                //color: "#F20FF0"
            },
            grid: {
                size: 10,      // 网格大小 10px
                visible: JSON.parse(localStorage.getItem("show_grid") || 'true'), // 渲染网格背景
                //type: "mesh",
                type: "fixedDot"
            },
            connecting: { //连线交互
                snap: false,//是否自动吸附
                connector: 'normal',
                createEdge() {
                    return new Shape.Edge({
                        shape: 'line',
                        attrs: {
                            line: {
                                stroke: '#333',
                                strokeWidth: 1,
                                targetMarker: null,
                                strokeDasharray: 0, //虚线
                                style: {
                                    animation: 'ant-line 30s infinite linear',
                                },
                            },
                        },
                        label: {
                            text: ''
                        },
                        router: {
                            name: 'normal'
                        },
                    })
                },
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

        //绘线
        this.graph.container.onmousemove = (event) => {
            if (this.drawingLine) {
                this.graph.addEdge({
                    shape: this.drawingLine.id,
                    source: [event.offsetX, event.offsetY],
                    target: [(event.offsetX) - 120, (event.offsetY) + 80],
                    ...this.drawingLine.metadata
                });
                this.drawingLine = undefined;
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

    public Render(page: HmiPage) {
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


    drawingLine?: NuwaComponent

    onDnd($event: DragEvent, component: NuwaComponent, args?:any) {
        let node!: Node

        //检查是否已经注册
        if (!this.checkComponent(component)) {
            //TODO 报错
            return;
        }

        if (component.type == "line") {
            this.drawingLine = component;
            //node = this.graph.createEdge({})
            return
        }

        //参数
        let data: any = {}
        component.bindings?.forEach(b => data[b.name] = b.default)
        Object.assign(data, args)

        //创建节点
        node = this.graph.createNode({
            shape: component.id,
            ...component.metadata,
            data: data,
        })

        this.dnd.start(node, $event);
    }


    public checkComponent(component: NuwaComponent): boolean {
        if (component.registered || component.internal)
            return true

        switch (component.type) {
            case "line":
                //注册线
                if (component.extends) {
                    Graph.registerEdge(component.id, component.extends)
                    component.registered = true
                    return true
                }
                //TODO 报错
                break
            case "shape":
                //注册衍生组件
                if (component.extends) {
                    Graph.registerNode(component.id, component.extends)
                    component.registered = true
                    return true
                }
                //TODO 报错
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
                //TODO 报错
                break;
        }

        return false;
    }

}
