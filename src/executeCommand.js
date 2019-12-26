"use strict";
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");
const { generateErrorMessage } = require("./cmdLineArgHandler");

const loadLines = function(cutOptions, read, onComplete) {
  const fileName = cutOptions.fileName;
  read(fileName, "utf8", (error, content) => {
    if (error)
      onComplete(generateErrorMessage("fileMissing", fileName).error, "");
    else {
      cutOptions.lines = content.split("\n");
      onComplete("", splitFields(cutOptions).join("\n"));
    }
  });
};

const executeCut = function(cmdLineArgs, read, onComplete) {
  const { cutOptions, error } = parseCmdLineArgs(cmdLineArgs);
  if (error) return onComplete(error, "");
  return loadLines(cutOptions, read, onComplete);
};

module.exports = {
  executeCut,
  loadLines
};
