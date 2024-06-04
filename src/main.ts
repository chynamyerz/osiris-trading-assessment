import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(
  createVuetify({
    components,
    directives
  })
)
app.use(createPinia())

app.mount('#app')
