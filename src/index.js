const isolatePlugin = require('./isolate_plugin');
const { PluginManager } = require('./plugin_manager');
const { setTimeout, setImmediate } = require('timers/promises');

function coreRunner(plugin) {
  plugin.setup();
  plugin.start();
}

(async function entry() {
  const pluginManager = new PluginManager();
  
  // simulate registering a plugin
  let pluginV1_0_0 = await pluginManager.registerPlugin('MyPlugin', '1.0.0');
  
  
  
  coreRunner(pluginV1_0_0);
  console.log('simulating plugin 1.0.0 running');
  await setTimeout(1000);
  
  const pluginV1_0_1 = await pluginManager.reloadNewVersion('MyPlugin', '1.0.1');
  pluginV1_0_0 = null;
  coreRunner(pluginV1_0_1);
  console.log('simulating plugin 1.0.1 running');
  await setTimeout(1000);
  console.log('shutting down');
  await pluginManager.stop();
  
  console.log('require.cache::', require.cache)
  
  console.log('completed.');
})()  
