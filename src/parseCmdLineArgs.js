'use strict';

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
  return userOptions.reduce(extractOptions, lookup);
};

module.exports = { parseCmdLineArgs };
