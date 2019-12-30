'use strict';
const { Cut } = require('./cutLib');
const { parseCmdLineArgs } = require('./parseCmdLineArgs');
const EMPTY_STRING = '';

const errors = {
  ENOENT: 'cut: No such file or directory',
  EISDIR: 'cut: Error reading',
  EACCES: 'cut: Permission denied'
};

const selectStream = function(fileName, createReadStream, stdin) {
  return fileName ? createReadStream(fileName) : stdin;
};

const onStream = function(stream, cutTools, onComplete) {
  stream.setEncoding('utf8');
  stream.on('data', content => {
    const requiredFields = cutTools.cutFields(content).join('\n');
    onComplete('', requiredFields);
  });
  stream.on('error', error =>
    onComplete(errors[error.code] || errors['ENOENT'], EMPTY_STRING)
  );
};

const executeCut = function(cmdLineArgs, inputStreams, onComplete) {
  const { createReadStream, stdin } = inputStreams;
  const { cutOptions, error } = parseCmdLineArgs(cmdLineArgs);
  if (error) {
    return onComplete(error, EMPTY_STRING);
  }
  const cutTools = new Cut(cutOptions);
  const stream = selectStream(cutOptions.fileName, createReadStream, stdin);
  return onStream(stream, cutTools, onComplete);
};

module.exports = { executeCut };
