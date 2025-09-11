import type { App } from 'vue'
import Conversation from './Conversation.vue'
import './style.scss'

Conversation.install = (app: App) => {
  app.component('Conversation', Conversation)
}

export default Conversation
export * from './types'
