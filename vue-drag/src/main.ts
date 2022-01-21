import { createApp } from 'vue'
import App from './App.vue'
import direct from '@/directive/index';
const app = createApp(App);
await direct(app);
app.mount('#app')