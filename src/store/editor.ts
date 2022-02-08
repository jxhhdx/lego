import { v4 as uuidv4 } from 'uuid'
import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface EditorProps {
    // 渲染到编辑器上的组件内容
    components: ComponentData[];
    // 当前选中的组件的uuid
    currentElement: string;
    // TODO
}

interface ComponentData {
    // 这个元素的属性
    props: { [key: string]: any };
    // id, uuid v4生成
    id: string;
    // 业务组件库名称 l-text, l-image等等
    name: string;
}


export const testComponent: ComponentData[] = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hello' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello2' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello3' } },
]

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponent,
        currentElement: ''
    }
}

export default editor