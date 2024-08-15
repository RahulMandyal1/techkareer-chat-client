import react from "@vitejs/plugin-react"

import { defineConfig, transformWithEsbuild } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        })
      },
    },
    react(),
  ],

  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
    },
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
})
