const savedObjects = {
  get: (objName) => {
    console.log(`[saved objects] getting ${objName}.`);
  }
}

module.exports = { savedObjects };