"use strict";
const fs = require("fs");

const loadLines = function(fileInfo, path) {
  try {
    return { lines: fileInfo.read(path, fileInfo.encoding).split("\n") };
  } catch (exception) {
    return { err: `cut: ${path}: No such file or directory` };
  }
};

const getFsTools = function() {
  return { read: fs.readFileSync, encoding: "utf8" };
};

module.exports = { loadLines, getFsTools };
