// vite 配置文件
import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import AutoImportPlugin from 'unplugin-auto-import/vite';
import VueComponentPlugin from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    vuePlugin(),
    vueJsxPlugin(),
    AutoImportPlugin({
      resolvers: [ElementPlusResolver()],
    }),
    VueComponentPlugin({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      // import.meta.url 获取数据文件的路径
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    outDir: 'dist', // 打包输出文件夹名称
  },
  server: {
    port: 3002, // 项目运行端口
  },
})