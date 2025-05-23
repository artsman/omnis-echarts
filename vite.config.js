import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath, URL } from "url";
import multiple from "vite-plugin-multiple"
import vue from "@vitejs/plugin-vue";

const isProduction = process.env.NODE_ENV === "production";

let buildExtra = {};
let pluginExtra = [];
if (isProduction) {
  buildExtra = {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000
  };
  pluginExtra.push(viteSingleFile({ removeViteModuleLoader: true }));
  pluginExtra.push(createHtmlPlugin());
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    multiple([
      {
        name: "ctrl_omnis_echarts",
        config: "vite.json-control.config.js"
      }
    ]),
    ...pluginExtra
  ],
  build: {
    ...buildExtra,
    rollupOptions: {
      input: {
        "omnis-echarts": fileURLToPath(new URL("./omnis-echarts.html", import.meta.url))
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
