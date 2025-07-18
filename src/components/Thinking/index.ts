import type { App } from 'vue'
import Thinking from './Thinking.vue'

Thinking.install = (app: App) => {
  app.component('Thinking', Thinking)
}

export default Thinking
export * from './types'
