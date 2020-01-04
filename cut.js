'use strict';
const {createReadStream} = require('fs');
const {stdout, stdin, stderr} = process;
const {StreamSelector} = require('./src/streamSelector');
const {executeCut} = require('./src/executeCommand');

const displayResult = (error, content) => {
  stdout.write(content);
  stderr.write(error);
};

const main = function(cmdLineArgs) {
  const [, , ...args] = cmdLineArgs;
  const streamSelector = new StreamSelector(stdin, createReadStream);
  executeCut(args, streamSelector, displayResult);
};

main(process.argv);
