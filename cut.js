"use strict";
const fs = require("fs");
const { executeCut } = require("./src/executeCommand");

const main = function(cmdLineArgs) {
  const displayResult = (error, content) => {
    process.stdout.write(content);
    console.error(error);
  };
  executeCut(cmdLineArgs, fs.readFile, displayResult);
};

main(process.argv);
