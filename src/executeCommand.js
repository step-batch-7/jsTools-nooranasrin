"use strict";
const { loadLines } = require("./fsOperationsLib");
const { getFields, getSplittedFields, extractSeparator } = require("./cutLib");

const extractFieldContents = function(cmdLineArg, fsTools, fileName) {
  fsTools.fileName = fileName;
  let cutInfo = loadLines(fsTools);
  const keys = Object.keys(cutInfo);
  if (keys.includes("err")) return cutInfo.err;
  cutInfo = getFields(cutInfo, cmdLineArg);
  cutInfo = extractSeparator(cmdLineArg, cutInfo);
  const fieldContents = getSplittedFields(cutInfo);
  return fieldContents.map(contents => contents.join("	"));
};

const handleCmdLineArgs = function(cmdLineArg, fsTools, fileNames) {
  const fieldContents = fileNames.map(
    extractFieldContents.bind(null, cmdLineArg, fsTools)
  );
  return fieldContents.map(contents => contents.join("\n"));
};

module.exports = { extractFieldContents, handleCmdLineArgs };
