"use strict";
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./cmdLineArgHandler");
const { generateErrorMessage } = require("./cmdLineArgHandler");

const handleCmdLineArg = function(cutInfo, fsTools, print) {
  const fileName = cutInfo.fileName;
  fsTools.read(fileName, fsTools.encoding, (error, content) => {
    if (content) {
      cutInfo.contents = { lines: content.split("\n") };
      print.showFields(splitFields(cutInfo).join("\n"));
    } else {
      print.showError(
        generateErrorMessage("fileMissing", cutInfo.fileName).error
      );
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
