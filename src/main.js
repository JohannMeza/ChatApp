import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes/routes.js'

createApp(App)
  .use(routes)
  .mount('#app')
