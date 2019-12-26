"use strict";
const { splitFields } = require("./cutLib");
const { parseCmdLineArgs } = require("./parseCmdLineArgs");
const EMPTY_STRING = "";

const loadLines = function(cutOptions, read, onComplete) {
  const { fileName } = cutOptions;
  const respondWithError = err => {
    onComplete(`cut: ${fileName}: No such file or directory`, EMPTY_STRING);
  };
  const respondWithLines = content => {
    const requiredFields = splitFields(cutOptions, content).join("\n");
    onComplete("", requiredFields);
  };

  read(fileName, "utf8", (error, content) => {
    if (error) respondWithError(error);
    else respondWithLines(content);
  });
};

const executeCut = function(cmdLineArgs, read, onComplete) {
  const { cutOptions, error } = parseCmdLineArgs(cmdLineArgs);
  if (error) onComplete(error, EMPTY_STRING);
  else loadLines(cutOptions, read, onComplete);
};

module.exports = { executeCut };
