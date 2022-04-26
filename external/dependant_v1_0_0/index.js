const VERSION = 'dependant v1.0.0';

class Plugin {
  constructor(dependencies) {
    console.log(`[${VERSION}] constructing plugin!`);
    this.dependencies = dependencies;
  }

  setup = () => {}
  
  start = ({ isolated }) => {
    console.log(`[${VERSION}] start called!`);
    console.log(`[${VERSION}] global variable value: "${global.pluginPollution1_0_0}"`);
    this.timer = setInterval(() => {
      console.log('attempting to get secret.')
      const secret = isolated.getMyPluginSecret();
      console.log('secret::', secret);
    }, 200)
  }
  
  stop = () => {
    console.log(`[${VERSION}] stop called!`);
    clearInterval(this.timer)
  }
}

module.exports = { Plugin }