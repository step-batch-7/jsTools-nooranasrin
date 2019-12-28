'use strict';
const { createReadStream } = require('fs');
const { stdout, stdin, stderr } = process;
const { executeCut } = require('./src/executeCommand');

const main = function(cmdLineArgs) {
  const displayResult = (error, content) => {
    stdout.write(content);
    stderr.write(error);
  };
  executeCut(cmdLineArgs, { createReadStream, stdin }, displayResult);
};

main(process.argv);
