import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {load} from '@amap/amap-jsapi-loader';
import {NuwaComponent} from "../../nuwa";

@Component({
    selector: '$nuwa-misc-amap',
    standalone: true,
    imports: [],
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .container {
            width: 100%;
            height: 100%;
        }
    `,
    template: `
        <div [id]="id" class="container"></div>`
})
class MiscAMapComponent implements OnInit {
    id = "amap_" + Math.random().toString(36);

    @Input() key = "eb6a831c04b6dfedda190d6254febb58"
    @Input() secret = "55de9923dc16159e4750b7c743117e0d"

    _style = "amap://styles/normal"
    @Input() set style(s: string) {
        this._style = s
        this.map?.setMapStyle(s)
    }

    map: any //AMap.Map;

    constructor(protected element: ElementRef) {

    }

    ngOnInit() {
        //@ts-ignore
        window._AMapSecurityConfig = {
            securityJsCode: this.secret,
        };

        //加载地图，并显示
        load({
            key: this.key,
            version: '2.0',
            plugins: ['AMap.Icon', 'AMap.Marker'],
            AMapUI: {
                version: '1.1',
                plugins: [],
            },
        }).then((AMap) => {
            //this.element.nativeElement
            this.map = new AMap.Map(this.id, {
                center: [120.301663, 31.574729],  //设置地图中心点坐标
                resizeEnable: true,
                mapStyle: this._style
            });

            // AMap.plugin('AMap.Geocoder', () => {
            //     this.geocoder = new AMap.Geocoder();
            // });
            // this.geocoder = new AMap.Geocoder({ city: '' });
            // this.marker = new AMap.Marker();

            this.map.setFitView();
        }).catch((e) => {
            console.log(e);
        });
    }
}


export const MiscAMap: NuwaComponent = {
    name: '高德地图', id: ':amap:',
    icon: "assets/widgets/amap.svg",
    type: "angular",
    metadata: {width: 200, height: 100, tools: ['boundary']},
    content: MiscAMapComponent,
    properties: [
        {key: "data/ngArguments/key", label: "KEY", type: "text", default:"eb6a831c04b6dfedda190d6254febb58"},
        {key: "data/ngArguments/secret", label: "秘钥", type: "text", default:"55de9923dc16159e4750b7c743117e0d"},
        {
            key: "data/ngArguments/style", label: "风格", type: "select", options: [
                {value: "amap://styles/normal", label: "标准"},
                {value: "amap://styles/dark", label: "幻影黑"},
                {value: "amap://styles/light", label: "月光银"},
                {value: "amap://styles/whitesmoke", label: "远山黛"},
                {value: "amap://styles/fresh", label: "草色青"},
                {value: "amap://styles/grey", label: "雅士灰"},
                {value: "amap://styles/graffiti", label: "涂鸦"},
                {value: "amap://styles/macaron", label: "马卡龙"},
                {value: "amap://styles/blue", label: "靛青蓝"},
                {value: "amap://styles/darkblue", label: "极夜蓝"},
                {value: "amap://styles/wine", label: "酱籽"},
            ]
        },
    ],
    bindings: [],
    hooks: {},
}
