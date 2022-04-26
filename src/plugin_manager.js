const path = require('path');
const { isolatePlugin } = require('./isolate_plugin');
class PluginManager {
  constructor() {
    this.pluginsMatrix = {};
    this.externalBasePath = path.join(__dirname, '..', 'external');
  }

  registerPlugin = async (pluginName, activeVersion) => {
    const pluginPath = this.versionToPluginPath(pluginName, activeVersion)
    const plugin = await isolatePlugin({ pluginPath });
    const pluginObject = {
      pluginName,
      activeVersion,
      plugin,
    }

    this.pluginsMatrix[pluginName] = pluginObject;
    return pluginObject;
  }

  reloadNewVersion = async (pluginName, activeVersion) => {
    const pluginObject = this.pluginsMatrix[pluginName];
    if (!pluginObject || pluginObject.activeVersion === activeVersion) {
      throw new Error('Error reloading plugin');
    }
    console.log(`shutting down plugin v${pluginObject.activeVersion}`);
    await this.shutdownPlugin(pluginName);
    
    // load new plugin version;
    console.log(`reloading plugin to ${activeVersion}`);
    return await this.registerPlugin(pluginName, activeVersion);
  }
  
  shutdownPlugin = async (pluginName) => {
    const pluginObject = this.pluginsMatrix[pluginName];
    // clean existing plugin
    await pluginObject.plugin.teardown();
    this.pluginsMatrix[pluginName] = null;
  }

  versionToPluginPath = (pluginName, version) => {
    const versionToPath = version.replace(/\./g, '_');

    return path.join(this.externalBasePath, `${pluginName}_v${versionToPath}`);
  }

  getPluginActiveVersion = (pluginName) => {
    const { activeVersion } = this.pluginsMatrix[pluginName];
    return activeVersion;
  }


  getPlugin = (pluginName) => {
    const { pluginInstance } = this.pluginsMatrix[pluginName];
    return pluginInstance;
  }

  stop = async () => {
    for (const [pluginName, { activeVersion }] of Object.entries(this.pluginsMatrix)) {
      console.log(`shutting down plugin v${activeVersion}`);
      await this.shutdownPlugin(pluginName);
    }
  }
}

module.exports = { PluginManager };