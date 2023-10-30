import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath, URL } from "url";
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
  plugins: [vue(), ...pluginExtra],
  build: buildExtra,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
