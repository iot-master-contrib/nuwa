import {SmartField, SmartSelectOption} from "iot-master-smart";

const fontFamilies: SmartSelectOption[] = [
    {value: "SimHei", label: "黑体"},
    {value: "SimSun", label: "宋体"},
    {value: "FangSong", label: "仿宋"},
    {value: "KaiTi", label: "楷体"},
    {value: "LiSu", label: "隶书"},
    {value: "YouYuan", label: "幼圆"},
]

const fontWeights: SmartSelectOption[] = [
    {value: "normal", label: "正常"},
    {value: "bold", label: "加粗"},
    //{value: "bolder", label: "加粗+"},
]

const fontStyles: SmartSelectOption[] = [
    {value: "normal", label: "正常"},
    {value: "italic", label: "斜体"},
]

export function StrokeProperties(id: string): SmartField[] {
    return [
        {label: "填充", key: `attrs/${id}/fill`, type: "color", clear: true},
        {label: "边框颜色", key: `attrs/${id}/stroke`, type: "color", clear: true},
        {label: "边框大小", key: `attrs/${id}/stroke-width`, type: "number", min: 0, max: 65535},
    ]
}

export const TextProperties: SmartField[] = [
    {label: "文本", key: "attrs/text/text", type: "text"},
    {label: "文本颜色", key: "attrs/text/fill", type: "color", clear: true},
    {label: "字号", key: "attrs/text/fontSize", type: "number", min: 0, max: 65535},
    {label: "字体", key: "attrs/text/fontFamily", type: "select", options: fontFamilies},
    {label: "加粗", key: "attrs/text/fontWeight", type: "select", options: fontWeights},
    {label: "风格", key: "attrs/text/fontStyle", type: "select", options: fontStyles},
]
