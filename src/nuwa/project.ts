export declare interface NuwaProject {
    id: string
    name: string
    description?: string
    pages: NuwaPage[]
}

export declare interface NuwaPage {
    name: string
    content: any
    width: number
    height: number
    background_color?: string
    background_image?: string
}

export function pageTemplate(): NuwaPage {
    return {
        name: "首页",
        content: {},
        width: window.screen.width, //自动获取屏幕尺寸
        height: window.screen.height,
    }
}

export function projectTemplate(): NuwaProject {
    return {
        id: '',
        name: '组态工程',
        pages: [
            pageTemplate()
        ]
    }
}
