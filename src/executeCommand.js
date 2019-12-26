"use strict";
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");
const { generateErrorMessage } = require("./cmdLineArgHandler");

const handleCmdLineArg = function(cutDetails, fsTools, print) {
  const fileName = cutDetails.fileName;
  const { showFields, showError } = print;
  fsTools.read(fileName, fsTools.encoding, (error, content) => {
    if (content) {
      cutDetails.contents = { lines: content.split("\n") };
      showFields(splitFields(cutDetails).join("\n"));
    } else {
      showError(generateErrorMessage("fileMissing", cutDetails.fileName).error);
    }
  });
};

const executeCut = function(cmdLineArgs, fsTools, print) {
  const cutInfo = parseCmdLineArgs(cmdLineArgs);
  if (cutInfo.error) {
    print.showError(cutInfo.error);
    return;
  }
  handleCmdLineArg(cutInfo, fsTools, print);
  return;
};

module.exports = {
  executeCut,
  handleCmdLineArg
};
