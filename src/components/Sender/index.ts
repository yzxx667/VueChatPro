import type { App } from 'vue'
import Sender from './Sender.vue'
import './style.scss'

Sender.install = (app: App) => {
  app.component('Sender', Sender)
}

export default Sender
export * from './types'
