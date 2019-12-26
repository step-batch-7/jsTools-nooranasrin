"use strict";
const { executeCut } = require("./src/executeCommand");
const fs = require("fs");
const { stdout } = process;

const main = function(cmdLineArgs) {
  const displayResult = (error, content) => {
    stdout.write(content);
    console.error(error);
  };
  executeCut(cmdLineArgs, fs.readFile, displayResult);
};

main(process.argv);
