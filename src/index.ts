import mitt, { Emitter, EventType } from 'mitt'
import {App, inject} from 'vue'

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

export const useEmitter = <
    T extends Record<EventType, unknown>
    >(): Emitter<T> => {
    return inject('$emitter')!
}

export default plugin
