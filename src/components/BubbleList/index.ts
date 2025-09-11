import type { App } from 'vue'
import BubbleList from './BubbleList.vue'
import './style.scss'

BubbleList.install = (app: App) => {
  app.component('BubbleList', BubbleList)
}

export default BubbleList
export * from './types'
