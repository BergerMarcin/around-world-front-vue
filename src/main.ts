import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useBackendApiService } from './api/backend-api-service'
import { ProviderKey } from './types/global.types'

const app = createApp(App)

app.provide(ProviderKey.BACKEND_API_SERVICE, useBackendApiService())
app.use(createPinia())
app.use(router)

app.mount('#app')
