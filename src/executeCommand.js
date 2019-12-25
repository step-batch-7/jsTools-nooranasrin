"use strict";
const { loadLines } = require("./fsOperationsLib");
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");

const executeCut = function(cmdLineArgs, fsTools) {
  const cutInfo = parseCmdLineArgs(cmdLineArgs);
  if (cutInfo.error) return { error: cutInfo.error };
  cutInfo.contents = loadLines(fsTools, cutInfo.fileName);
  if (cutInfo.contents.error) return { error: cutInfo.contents.error };
  return { msg: splitFields(cutInfo) };
};

module.exports = {
  executeCut
};
