"use strict";
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");
const { generateErrorMessage } = require("./cmdLineArgHandler");

const loadContents = function(print, error, content) {
  if (content) {
    this.contents = { lines: content.split("\n") };
    print.showFields(splitFields(this).join("\n"));
  } else {
    print.showError(generateErrorMessage("fileMissing", this.fileName).error);
  }
};

const executeCut = function(cmdLineArgs, fsTools, print) {
  const cutInfo = parseCmdLineArgs(cmdLineArgs);
  const fileName = cutInfo.fileName;
  if (cutInfo.error) {
    print.showError(cutInfo.error);
    return;
  }
  fsTools.read(fileName, fsTools.encoding, loadContents.bind(cutInfo, print));
};

module.exports = {
  executeCut,
  loadContents
};
