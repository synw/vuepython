import { createApp } from 'vue'
import App from './App.vue'
import "../../dist/style.css";
import "vuecodit/style.css"
import './assets/index.css';
import "@docdundee/vue/style.css";
import router from './router';

createApp(App).use(router).mount('#app')
