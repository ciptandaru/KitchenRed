// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId:
      "1042021676188-icmio6fvb70lr76iijbnsnnimjt9qm91.apps.googleusercontent.com",
  });

app.mount('#app')