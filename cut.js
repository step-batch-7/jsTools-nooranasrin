'use strict';
const { createReadStream } = require('fs');
const { stdout, stdin, stderr } = process;
const { executeCut } = require('./src/executeCommand');

const main = function(cmdLineArgs) {
  const [, , ...args] = cmdLineArgs;
  const displayResult = (error, content) => {
    stdout.write(content);
    stderr.write(error);
  };
  const inputStreams = { createReadStream, stdin };
  executeCut(args, inputStreams, displayResult);
};

main(process.argv);
