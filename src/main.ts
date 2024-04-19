import { createApp } from 'vue'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import '@unocss/reset/tailwind-compat.css'
import '@/styles/main.scss'
import setupStore from './stores'
import setupRouter from './router'
import App from './App.vue'

const app = createApp(App)
setupRouter(app)
setupStore(app)
app.mount('#app')
