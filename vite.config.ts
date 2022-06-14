import {defineConfig} from 'vite'
import * as path from 'path'
import typescript from "@rollup/plugin-typescript"

const resolvePath = (str: string) => path.resolve(__dirname, str)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Vue3EventBus",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        typescript({
          'target': 'es2020',
          'rootDir': resolvePath('./src'),
          'declaration': true,
          'declarationDir': resolvePath('./dist'),
          exclude: resolvePath('./node_modules/**'),
          allowSyntheticDefaultImports: true
        })
      ]
    },
  },
})
