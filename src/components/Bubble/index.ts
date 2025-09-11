import type { App } from 'vue'
import Bubble from './Bubble.vue'
import './style.scss'

Bubble.install = (app: App) => {
  app.component('Bubble', Bubble)
}

export default Bubble
export * from './types'
