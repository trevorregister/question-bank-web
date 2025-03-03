import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router/index'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
app.use(createPinia())
app.use(router)

app.mount('#app')