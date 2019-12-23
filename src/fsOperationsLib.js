"use strict";
const fs = require("fs");

const loadLines = function(fileInfo) {
  const path = fileInfo.fileName;
  try {
    return { lines: fileInfo.read(path, fileInfo.encoding).split("\n") };
  } catch (exception) {
    return { err: [`cut: ${path}: No such file or directory`] };
  }
};

const getFsTools = function(fileName) {
  return { fileName, read: fs.readFileSync, encoding: "utf8" };
};

module.exports = { loadLines, getFsTools };
