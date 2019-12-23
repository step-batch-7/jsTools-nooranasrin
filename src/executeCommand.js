"use strict";
const { getFsTools, loadLines } = require("./fsOperationsLib");
const {
  getFields,
  getSplittedFields,
  getFileName,
  extractSeparator
} = require("./cutLib");

const handleCmdLineArg = function(cmdLineArg) {
  const fileName = getFileName(cmdLineArg);
  const fsTools = getFsTools(fileName);
  let cutInfo = loadLines(fsTools);
  const keys = Object.keys(cutInfo);
  if (keys.includes("err")) return cutInfo.err;
  cutInfo = getFields(cutInfo, cmdLineArg);
  cutInfo = extractSeparator(cmdLineArg, cutInfo);
  const fieldContents = getSplittedFields(cutInfo);
  return fieldContents.map(contents => contents.join("	"));
};

module.exports = { handleCmdLineArg };
