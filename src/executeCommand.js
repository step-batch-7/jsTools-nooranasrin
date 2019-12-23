"use strict";
const { loadLines } = require("./fsOperationsLib");
const {
  extractFields,
  getSplittedFields,
  extractSeparator
} = require("./cutLib");

const formatMsg = function(separator, line) {
  if (line[line.length - 1] === undefined)
    return line.slice(0, -1).join(separator);
  return line.join(separator);
};

const executeCut = function(cutInfo, cmdLineArg) {
  cutInfo = extractFields(cutInfo, cmdLineArg);
  cutInfo = extractSeparator(cmdLineArg, cutInfo);
  const fieldContents = getSplittedFields(cutInfo);
  return fieldContents.map(formatMsg.bind(null, cutInfo.separator));
};

const extractFieldContents = function(cmdLineArg, fsTools, fileName) {
  fsTools.fileName = fileName;
  let cutInfo = loadLines(fsTools);
  const keys = Object.keys(cutInfo);
  if (keys.includes("err")) return cutInfo.err;
  return executeCut(cutInfo, cmdLineArg);
};

const handleCmdLineArgs = function(cmdLineArg, fsTools, fileNames) {
  const fieldContents = fileNames.map(
    extractFieldContents.bind(null, cmdLineArg, fsTools)
  );
  return fieldContents.map(contents => contents.join("\n"));
};

const chooseInputType = function(process, args, fsTools, fileNames) {
  if (fileNames.length != 0) {
    process.stdout.write(
      `${handleCmdLineArgs(args, fsTools, fileNames).join("\n")}`
    );
  } else {
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", data => {
      let cutInfo = { lines: [data.trim()] };
      process.stdout.write(`${executeCut(cutInfo, args)}\n`);
    });
  }
};

module.exports = {
  extractFieldContents,
  handleCmdLineArgs,
  formatMsg,
  chooseInputType,
  executeCut
};
