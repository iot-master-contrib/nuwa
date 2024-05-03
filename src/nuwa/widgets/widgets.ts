import {NuwaCollection} from "../nuwa";
import {BaseLine} from "./base/line";
import {ControlButton} from "./control/button";
import {BaseText} from "./base/text";
import {BaseRect} from "./base/rect";
import {BaseCircle} from "./base/circle";
import {BaseEllipse} from "./base/ellipse";
import {BaseImage} from "./base/image";
import {ControlNumber} from "./control/number";
import {Echarts} from "./echarts/echarts";
import {EchartsBar} from "./echarts/echarts-bar";
import {EchartsGauge} from "./echarts/echarts-gauge";
import {EchartsLine} from "./echarts/echarts-line";
import {EchartsPie} from "./echarts/echarts-pie";

export const NuwaWidgets: NuwaCollection[] = [
    {
        name: "基础组件",
        components: [
            BaseLine, BaseText, BaseRect, BaseCircle, BaseEllipse, BaseImage,
        ]
    },
    {
        name: "交互控件",
        components: [
            ControlButton, ControlNumber,
        ]
    },
    {
        name: "图表组件",
        components: [Echarts, EchartsBar, EchartsGauge, EchartsLine, EchartsPie]
    },
    {
        name: "其他组件",
        components: []
    },
]
