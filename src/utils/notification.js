// plugins/vue-toastification.client.js
import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Si es necesario

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast.default);
});
