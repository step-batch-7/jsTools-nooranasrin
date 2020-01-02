'use strict';

const validateArgs = function(cutOptions) {
  const fieldZero = 0;
  const delimiterLength = 1;
  if(+cutOptions['-f'] === fieldZero) {
    return { error: 'cut: [-cf] list: values may not include zero' };
  }
  if(!Number.isInteger(+cutOptions['-f'])) {
    return { error: 'cut: [-cf] list: illegal list value' };
  }
  if(cutOptions['-d'].length > delimiterLength) {
    return {error: 'cut: bad delimiter'};
  }
  return cutOptions;
};

const pairArgs = function(userOptions, cmdLineArg) {
  const secondIndex = 1;
  if(cmdLineArg.startsWith('-')) {
    userOptions.push(cmdLineArg);
    return userOptions;
  }
  if(Array.isArray(userOptions[userOptions.length - secondIndex])) {
    userOptions.push(cmdLineArg);
    return userOptions;
  }
  const option = userOptions.pop();
  userOptions.push([option, cmdLineArg]);
  return userOptions;
};

const extractOptions = function(cutOptions, optionPair) {
  const secondIndex = 1;
  const firstIndex = 0;
  if(!Array.isArray(optionPair)) {
    cutOptions.fileName = optionPair;
    return cutOptions;
  }
  cutOptions[optionPair[firstIndex]] = optionPair[secondIndex];
  return cutOptions;
}; 

const parseCmdLineArgs = function(cmdLineArgs) {
  const userOptions = cmdLineArgs.reduce(pairArgs, []);
  const lookup = {'-f': 'field', '-d': '\t'};
  const cutOptions = userOptions.reduce(extractOptions, lookup);
  const {error} = validateArgs(cutOptions);
  if (error) {
    return { error };
  }
  return {cutOptions};
};

module.exports = { parseCmdLineArgs };
