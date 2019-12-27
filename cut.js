'use strict';
const { createReadStream } = require('fs');
const { stdout, stdin } = process;
const { executeCut } = require('./src/executeCommand');

const main = function(cmdLineArgs) {
  const displayResult = (error, content) => {
    stdout.write(content);
    console.error(error);
  };
  executeCut(cmdLineArgs, createReadStream, stdin, displayResult);
};

main(process.argv);
