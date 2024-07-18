import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification"; // Importación solo de tipo
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";



const app = createApp(App)

const options: PluginOptions = {
    // You can set your default options aquí
};

app.use(Toast, options);
app.use(createPinia())

app.use(router)

app.mount('#app')
