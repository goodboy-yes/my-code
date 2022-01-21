import { App } from 'vue'

const modules = import.meta.glob('../directive/**/**.ts')
// 自动导入当前文件夹下的所有自定义指令(默认导出项)
export default (app: App<Element>): Promise<void> => {
  return new Promise(async (resolve) => {
    for (const path of Object.keys(modules)) {
      if (path !== '../directive/index.ts')  {
        const mod = await modules[path]()
        mod.default(app)
      }
    }
    resolve()
  })
}
