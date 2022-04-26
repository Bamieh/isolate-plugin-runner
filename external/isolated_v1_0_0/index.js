const VERSION = 'v1.0.0';

class Plugin {
  constructor(dependencies) {
    console.log(`[${VERSION}] constructing plugin!`);
    console.log('dependencies::', dependencies);
    this.dependencies = dependencies;
    this.secret = `this is the secret of ${VERSION}`;
    this.dependencies.savedObjects.get('CONSTR')
  }

  setup = () => {
    console.log(`[${VERSION}] setup called!`);
    global.pluginPollution1_0_0 = 'OK I am polluted';
    this.dependencies.savedObjects.get('SETUP')
  }
  
  start = () => {
    console.log(`[${VERSION}] start called!`);
    console.log(`[${VERSION}] global variable value: "${global.pluginPollution1_0_0}"`);
    return {
      getMyPluginSecret: () => {
        return this.secret;
      }
    }
  }
  
  stop = () => {
    console.log(`[${VERSION}] stop called!`);
  }
}

module.exports = { Plugin }