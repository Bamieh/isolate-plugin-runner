const VERSION = 'v1.0.0';

class Plugin {
  constructor() {
    console.log(`[${VERSION}] constructing plugin!`);
  }

  setup = () => {
    console.log(`[${VERSION}] setup called!`);
  }
  
  start = () => {
    console.log(`[${VERSION}] start called!`);
    
  }
  
  stop = () => {
    console.log(`[${VERSION}] stop called!`);
  }
}

module.exports = { Plugin }