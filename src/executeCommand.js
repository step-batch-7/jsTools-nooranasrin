"use strict";
const { loadLines } = require("./fsOperationsLib");
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");

const executeCut = function(cmdLineArgs, fsTools) {
  const cutInfo = parseCmdLineArgs(cmdLineArgs);
  if (cutInfo.error) return { error: cutInfo.error, msg: "" };
  cutInfo.contents = loadLines(fsTools, cutInfo.fileName);
  if (cutInfo.contents.error) return { error: cutInfo.contents.error, msg: "" };
  return { msg: splitFields(cutInfo).join("\n"), error: "" };
};

module.exports = {
  executeCut
};
