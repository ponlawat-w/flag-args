const process = require('process');

module.exports = acceptedFlags => {
  const result = {
    flags: [],
    has: function(checkFlags) {
      if (typeof checkFlags === 'string') {
        return this.flags.indexOf(checkFlags) > -1;
      }

      for (let i = 0; i < checkFlags.length; i++) {
        if (this.flags.indexOf(checkFlags[i]) > -1) {
          return true;
        }
      }
      return false;
    }
  };

  process.argv.forEach(arg => {
    if (acceptedFlags.indexOf(arg) > -1) {
      result.flags.push(arg);
    }
  });

  return result;
};
