import { ConfigEnv, UserConfigExport } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv } from 'vite'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
        //vite.config.ts无法使用import.meta.env，可使用loadEnv，详情见https://github.com/vitejs/vite/issues/1930
        prodEnabled: command !== 'serve' && loadEnv(mode, process.cwd()).VITE_APP_MOCK as unknown as boolean,
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内,如果生产环境开启了mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。injectFile默认为main.{ts,js}
        // 这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
      vue(),
    ],
    resolve: {
      alias: {
        "/@": path.resolve(__dirname, 'src')
      }
    },
    base: '/gkc/mock'
  }
}
