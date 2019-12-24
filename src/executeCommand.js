"use strict";
const { loadLines } = require("./fsOperationsLib");
const { splitFields } = require("./cutLib");

const extractFieldContents = function(cutInfo) {
  const fieldContents = splitFields(cutInfo);
  return fieldContents;
};

const executeCut = function(cutInfo, fsTools) {
  cutInfo.contents = loadLines(fsTools, cutInfo.fileName);
  if (cutInfo.contents.err) return { error: cutInfo.contents.err };
  return { msg: extractFieldContents(cutInfo) };
};

module.exports = {
  executeCut,
  extractFieldContents
};
