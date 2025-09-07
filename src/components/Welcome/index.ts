import type { App } from 'vue'
import Welcome from './Welcome.vue'

Welcome.install = (app: App) => {
  app.component('Welcome', Welcome)
}

export default Welcome
export * from './types'
