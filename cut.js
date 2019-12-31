'use strict';
const { createReadStream } = require('fs');
const { stdout, stdin, stderr } = process;
const { executeCut } = require('./src/executeCommand');

const displayResult = (error, content) => {
  stdout.write(content);
  stderr.write(error);
};

const main = function(cmdLineArgs) {
  const [, , ...args] = cmdLineArgs;
  const createStdinStream = () => stdin;
  const inputStreamCreator = { createReadStream, createStdinStream };
  executeCut(args, inputStreamCreator, displayResult);
};

main(process.argv);
