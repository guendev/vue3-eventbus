# Vue 3 EventBus
"In Vue 3, it is no longer possible to use these APIs to listen to a component's own emitted events from within a component. There is no migration path for that use case". See [doc](https://v3-migration.vuejs.org/breaking-changes/events-api.html#_3-x-update).\
This library is a wrapper of [mitt](https://www.npmjs.com/package/mitt), that will help you enable eventbus again.
## Installation
```
npm i @nguyenshort/vue3-mitt
```

## Initialization

Easy install and use.

Global:

```js
// main.ts, main.js
import Vue from "vue";
import VueMitter from '@nguyenshort/vue3-mitt'

app.use(VueMitter)
```

Component:

```js
import VueMitter from '@nguyenshort/vue3-mitt'
export default {
    provide: {
        '$emitter': VueMitter
    }
}
```

## Usage

Support option API and Composition API

### Option API
```vue
<script>
export default {
  name: "FooComponent",
  methods: {
    test() {
      this.$emitter.emit('foo', 'bar')
    }
  }
};
</script>
```
```vue
<script>
export default {
  name: "BarComponent",
  mounted() {
    this.$emitter.on('foo', (data) => {
      console.log('foo: ', data) // foo: bar
    })
  },
  beforeUnmount() {
    // Don't forget the destroy event. Avoid memory leaks
    this.$emitter.off('foo')
  }
};
</script>
```

### Composition API

```vue
<script setup>
import { useEmitter } from '@nguyenshort/vue3-mitt'
const emitter = useEmitter()

const sendEvent = () => {
  emitter.emit('foo', 'bar')
}

</script>
```

```vue
<script setup>
import {onMounted, onUnmounted} from "@vue/runtime-core"
import {useEmitter} from '@nguyenshort/vue3-mitt'

const emitter = useEmitter()

onMounted(() => emitter.on('foo', (data) => {
  console.log('foo:', data) // foo: bar
}))

// Don't forget the destroy event. Avoid memory leaks
onUnmounted(() => emitter.off('foo'))

</script>
```

## Typescript

```ts
import {useEmitter} from '@nguyenshort/vue3-mitt'

const emitter = useEmitter<{
    foo: string
}>()

```
