const VERSION = 'v1.0.1';

class Plugin {
  constructor() {
    console.log(`[${VERSION}] constructing plugin!`);
    this.secret = `this is the secret of ${VERSION}`;
  }

  setup = () => {
    console.log(`[${VERSION}] setup called!`);
  }
  
  start = () => {
    console.log(`[${VERSION}] start called!`);
    process.stdout.write(`[${VERSION}] checking if global variables set in v1.0.0 exists: `);
    if (typeof global.pluginPollution1_0_0 !== 'undefined') {
      console.log(`[${VERSION}] global variables set in v1.0.0 do exist:`)
      throw new Error(`- Found global.pluginPollution1_0_0 = ${global.pluginPollution1_0_0}`) 
    } else {
      process.stdout.write('pass.\n')
    }

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