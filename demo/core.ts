/* 
  Core类用途：1、实现基础功能，2、管理插件
*/

interface IPlugin {
  name: string, // 插件名字
  fn: Function // 插件能力
}
/* 内核类 基础功能 + 插件调度器 */
class Core {
  private pluginMap: Map<string, IPlugin> = new Map(); // 插件集合
  constructor() {
    console.log('实现内核基础功能：文档初始化')
  }
  use(plugin: IPlugin): Core {
    this.pluginMap.set(plugin.name, plugin)
    return this
  }
  run(): void {
    this.pluginMap.forEach((plugin) => {
      plugin.fn()
    })
  }
}
class PluginBase implements IPlugin {
  name: string = 'BlockBase'
  fn() {
    console.log('标准版：BlockBase')
  }
}
class Plugin1 extends PluginBase {
  name: string = 'Block1'
  fn() {
    console.log('扩展文档功能：Block1')
  }
}
class Plugin2 extends PluginBase {
  name: string = 'Block2'
  fn() {
    console.log('扩展文档功能：Block2')
  }
}
const core = new Core()
const pluginBase = new PluginBase()
const plugin1 = new Plugin1()
const plugin2 = new Plugin2()
core.use(pluginBase).use(plugin1).use(plugin2)
core.run()