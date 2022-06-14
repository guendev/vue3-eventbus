import mitt from 'mitt'
import {App} from 'vue'

const emitter = mitt()

// Cutsom type
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $emitter: typeof emitter
    }
}

const plugin = {
    install(app: App) {
        app.provide('$emitter', emitter)
        app.config.globalProperties.$emitter = emitter
    }
}

export default plugin
