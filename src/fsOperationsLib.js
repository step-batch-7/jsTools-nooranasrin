"use strict";
const fs = require("fs");
const { generateErrorMessage } = require("./cmdLineArgHandler");

const loadLines = function(fileInfo, path) {
  try {
    return { lines: fileInfo.read(path, fileInfo.encoding).split("\n") };
  } catch (exception) {
    return generateErrorMessage("fileMissing", path);
  }
};

const getFsTools = function() {
  return { read: fs.readFileSync, encoding: "utf8" };
};

module.exports = { loadLines, getFsTools };
