import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

// Setup echarts
import "echarts";
import "./themes";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
