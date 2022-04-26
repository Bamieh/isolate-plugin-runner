const isolatePlugin = require('./isolate_plugin');
const { PluginManager } = require('./plugin_manager');
const { setTimeout, setImmediate } = require('timers/promises');
const { Core } = require('./core');

(async function entry() {  
  const pluginManager = new PluginManager();
  const core = new Core();
  
  // simulate registering a plugin
  let isoPluginV1_0_0 = await pluginManager.registerPlugin('isolated', '1.0.0');
  let dependantPluginV1_0_0 = await pluginManager.registerPlugin('dependant', '1.0.0');
  
  core.updatePluginGraph(isoPluginV1_0_0);
  core.updatePluginGraph(dependantPluginV1_0_0);

  console.log('simulating plugin 1.0.0 running');
  await setTimeout(1000);
  
  const isoPluginV1_0_1 = await pluginManager.reloadNewVersion('isolated', '1.0.1');
  isoPluginV1_0_0 = null;

  core.updatePluginGraph(isoPluginV1_0_1);
  console.log('simulating plugin 1.0.1 running');
  await setTimeout(1000);
  console.log('shutting down');
  core.stopPlugins();
  await pluginManager.stop();
  
  // console.log('require.cache::', require.cache)
  
  console.log('completed.');
})()  
