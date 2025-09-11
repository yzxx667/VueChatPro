import type { App } from 'vue'
// import './theme/index.scss'
import './theme/var.scss'
// import './theme/config.scss'
// import './theme/mixin.scss'
import Welcome from './components/Welcome'
import Thinking from './components/Thinking'
import Bubble from './components/Bubble'
import BubbleList from './components/BubbleList'
import Conversation from './components/Conversation'
import Sender from './components/Sender'

const components = [Welcome, Thinking, Bubble, BubbleList, Conversation, Sender]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.__name!, component)
  })
}

export default { install }
export { Welcome, Thinking, Bubble, BubbleList, Conversation, Sender }
export { useAudio } from './hooks/useAudio'
export { useStream } from './hooks/useStream'
export type * from './components/Welcome/types'
export type * from './components/Thinking/types'
export type * from './components/Bubble/types'
export type * from './components/BubbleList/types'
export type * from './components/Conversation/types'
export type * from './components/Sender/types'
export type * from './hooks/useAudio'
export type * from './hooks/useStream'
