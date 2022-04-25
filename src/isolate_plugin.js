const SynchronousWorker = require('synchronous-worker');
const { setImmediate } = require('timers/promises');


function bubbleError (err) {
  console.error({
    err: {
      message: err.message,
      stack: err.stack
    }
  }, 'error encounterated within the isolate plugin');

  process.emit('uncaughtException', err)
}


async function isolatePlugin({ pluginPath }) {
  const worker = new SynchronousWorker({
    sharedEventLoop: true,
    sharedMicrotaskQueue: true
  });

  let _require = worker.createRequire(pluginPath);
  worker.process.on('uncaughtException', bubbleError)
  worker.globalThis.Error = Error

  // require plugin inside VM isolate
  const plugin = _require(pluginPath);
 
  // ready to be garbage collected
  _require = null;

  return {
    plugin,
    teardown: async () => {
      console.log('tearing down worker!');
      // the immediate blocks are needed to ensure that the worker
      // has actually finished its work before closing
      await setImmediate();
      await worker.stop();
      await setImmediate();
    }
  }
}

module.exports = { isolatePlugin };