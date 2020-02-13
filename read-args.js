const process = require('process');
const readline = require('readline-sync');

module.exports = (acceptedArgs) => {
  const result = {
    args: {},
    has: function(paramNames) {
      if (typeof(paramNames) === 'string') {
        return this.args[paramNames] ? true : false;
      }
      for (let i = 0; i < paramNames.length; i++) {
        if (this.args[paramNames[i]]) {
          return true;
        }
      }
      return false;
    },
    get: function(paramNames) {
      if (typeof(paramNames) === 'string' && this.args[paramNames]) {
        return this.args[paramNames];
      }
      for (let i = 0; i < paramNames.length; i++) {
        if (this.args[paramNames[i]]) {
          return this.args[paramNames[i]];
        }
      }
      return undefined;
    },
    getOrReadline: function(paramNames, readlineQuestion = null) {
      if (!readlineQuestion) {
        readlineQuestion = `${typeof paramNames === 'string' ? paramNames : paramNames[0]}: `;
      }
      const value = this.get(paramNames);
      if (!value) {
        return readline.question(readlineQuestion);
      }
      return value;
    }
  };
  
  if (typeof acceptedArgs === 'string') {
    acceptedArgs = [acceptedArgs];
  }

  process.argv.forEach((value, index) => {
    if (acceptedArgs.indexOf(value) > -1 && index <= process.argv.length - 1) {
      result.args[value] = process.argv[index + 1];
    }
  });

  return result;
};
