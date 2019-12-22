const fs = require("fs");

const loadLines = function(fileInfo) {
  const fileName = fileInfo.fileName;
  try {
    return { lines: fileInfo.read(fileName, fileInfo.encoding).split("\n") };
  } catch (exception) {
    return { err: `cut: ${fileName}: No such file or directory` };
  }
};

const getFsTools = function(fileName) {
  return { fileName, write: fs.readFileSync, encoding: "utf8" };
};

module.exports = { loadLines, getFsTools };
