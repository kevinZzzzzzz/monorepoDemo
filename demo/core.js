"use strict";
/*
  Core类用途：1、实现基础功能，2、管理插件
*/
/* 内核类 基础功能 + 插件调度器 */
class Core {
    constructor() {
        this.pluginMap = new Map(); // 插件集合
        console.log('实现内核基础功能：文档初始化');
    }
    use(plugin) {
        this.pluginMap.set(plugin.name, plugin);
        return this;
    }
    run() {
        this.pluginMap.forEach((plugin) => {
            plugin.fn();
        });
    }
}
class PluginBase {
    constructor() {
        this.name = 'BlockBase';
    }
    fn() {
        console.log('标准版：BlockBase');
    }
}
class Plugin1 extends PluginBase {
    constructor() {
        super(...arguments);
        this.name = 'Block1';
    }
    fn() {
        console.log('扩展文档功能：Block1');
    }
}
class Plugin2 extends PluginBase {
    constructor() {
        super(...arguments);
        this.name = 'Block2';
    }
    fn() {
        console.log('扩展文档功能：Block2');
    }
}
const core = new Core();
const pluginBase = new PluginBase();
const plugin1 = new Plugin1();
const plugin2 = new Plugin2();
core.use(pluginBase);
core.run();
