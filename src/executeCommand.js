"use strict";
const { getFsTools, loadLines } = require("./fsOperationsLib");
const { getFields, getSplittedFields, getFileName } = require("./cutLib");

const handleCmdLineArg = function(cmdLineArg) {
  const fileName = getFileName(cmdLineArg);
  const fsTools = getFsTools(fileName);
  let cutInfo = loadLines(fsTools);
  const keys = Object.keys(cutInfo);
  if (keys.includes("err")) return cutInfo.err;
  cutInfo = getFields(cutInfo, cmdLineArg);
  return getSplittedFields(cutInfo);
};

module.exports = { handleCmdLineArg };
