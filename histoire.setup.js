// Import Tailwind CSS for use in Histoire environment
// NOTE: Must use ./ and not @ (regular vite.config.js doesn't apply here)
import "./src/main.css";
import { createPinia } from "pinia";

// Setup echarts
import "echarts";
import "./src/themes";

export function setupApp({ app }) {
  // Import pinia
  app.use(createPinia());
}
