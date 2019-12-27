'use strict';
const { createReadStream } = require('fs');
const { executeCut } = require('./src/executeCommand');
const { stdout, stdin } = process;

const main = function(cmdLineArgs) {
  const displayResult = (error, content) => {
    process.stdout.write(content);
    console.error(error);
  };
  executeCut(cmdLineArgs, createReadStream, stdin, displayResult);
};

main(process.argv);
