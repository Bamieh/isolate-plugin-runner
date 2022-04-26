const { savedObjects } = require('./saved_objects');

class Core {
  constructor() {
    this.plugins = {};
    this.dependencies = {
      savedObjects
    }
    this.setupContracts = {};
    this.startContracts = {};
  }

  proxyHandler = (pluginName, accessor) => {
    return {
      get: (target, prop, receiver) => {
        console.log(`proxy called. getting ${pluginName}.${accessor}`)
        const plugin = this.plugins[pluginName][accessor];
        return Reflect.get(plugin, prop);
      }
    }
  };
  
  setupPlugins = () => {
    for (const [pluginName, { instance }] of Object.entries(this.plugins)) {
      const contract = instance.setup(this.setupContracts);
      this.plugins[pluginName].setup = contract;
      this.setupContracts[pluginName] = new Proxy(contract || {}, this.proxyHandler(pluginName, 'setup'));
    }
  }

  startPlugins = () => {
    for (const [pluginName, { instance }] of Object.entries(this.plugins)) {
      const contract = instance.start(this.startContracts);
      this.plugins[pluginName].start = contract;
      this.startContracts[pluginName] = new Proxy(contract || {}, this.proxyHandler(pluginName, 'start'));
    }
  }

  updatePluginGraph = ({ pluginName, activeVersion, plugin }) => {
    this.plugins[pluginName] = {
      pluginName,
      activeVersion,
      instance: new plugin.plugin.Plugin(this.dependencies),
      setup: null,
      start: null,
    }
    // for demo purposes refresh all plugins instead only of the plugin itself and their dependendents graph
    this.setupPlugins();
    this.startPlugins();
  }

  stopPlugins = () => {
    for (const { instance } of Object.values(this.plugins)) {
      instance.stop();
    }
  }
}

module.exports = { Core };
