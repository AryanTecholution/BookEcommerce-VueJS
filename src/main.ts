import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css"; // This is good, assuming you are using this file for global styles.

const app = createApp(App);

// Global properties (e.g., filters)
app.config.globalProperties.$filters = {
  currency(value: any) {
    return `$${value.toFixed(2)}`;
  },
};

app.use(createPinia()); // Use Pinia for state management
app.use(router); // Use the router for route handling

app.mount("#app"); // Mount the app to the DOM element with id="app"
