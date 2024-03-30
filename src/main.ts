import 'polyfill-object.fromentries' // 浏览器版本问题导致Object.fromEntries is not a function的问题

import App from './app.vue'
import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setFunDebug } from '../config/fundebug.config.js'

import './styles/app.less'
import './styles/reset.less'
const app = createApp(App)
setupStore(app)
setupRouter(app)
setFunDebug(app)
app.mount('#app')
