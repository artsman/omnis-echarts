import { defineConfig } from "vite"
import { fileURLToPath, URL } from "url"
import { viteStaticCopy } from "vite-plugin-static-copy"
import vue from "@vitejs/plugin-vue"

const isProduction = process.env.NODE_ENV === "production"

let buildExtra = {}

const pluginExtra = []
if (isProduction) {
  buildExtra = {
    ...buildExtra,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "json-control/*",
          dest: "omnis_echarts"
        }
      ]
    }),
    ...pluginExtra
  ],
  build: {
    ...buildExtra,
    sourcemap: true,
    rollupOptions: {
      input: {
        ctrl_omnis_echarts: fileURLToPath(new URL("./src/json_control_main.js", import.meta.url))
      },
      output: {
        manualChunks: false,
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") return "ctrl_omnis_echarts.css"
          return assetInfo.name
        },
        entryFileNames: "[name].js"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
