import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router/index'
import { createPinia } from 'pinia'
import App from './App.vue'
import CardActions from './shared/global/CardActions.vue'
import CardBody from './shared/global/CardBody.vue'
import CardHeader from './shared/global/CardHeader.vue'
import CardSection from './shared/global/CardSection.vue'
import BaseButton from './shared/global/BaseButton.vue'

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
app.component('CardBody', CardBody)
app.component('CardActions', CardActions)
app.component('CardHeader', CardHeader)
app.component('CardSection', CardSection)
app.component('BaseButton', BaseButton)

app.mount('#app')