import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

// Setup echarts
import "echarts";

import { PROVIDE_OMNIS_COMPONENT_ID } from "./global"

import "./themes";

// App factory for binding to an app to an element
export function mountApp(id, elem) {
  const pinia = createPinia();
  const app = createApp(App);

  app.provide(PROVIDE_OMNIS_COMPONENT_ID, id)

  app.use(pinia);
  app.mount(elem)
}
