'use strict';
const { splitFields } = require('./cutLib');
const { parseCmdLineArgs } = require('./parseCmdLineArgs');
const EMPTY_STRING = '';

const errors = {
  ENOENT: 'cut: No such file or directory',
  EISDIR: 'cut: Error reading',
  EACCES: 'cut: Permission denied'
};

const selectStream = function(fileName, fileReadStream, stdin) {
  return fileName ? fileReadStream(fileName) : stdin;
};

const respondWithContent = function(onComplete, content) {
  const requiredFields = splitFields(this, content).join('\n');
  onComplete('', requiredFields);
};

const respondWithError = function(onComplete, error) {
  onComplete(errors[error.code] || errors[`ENOENT`], EMPTY_STRING);
};

const onStream = function(stream, cutOptions, onComplete) {
  stream.setEncoding('utf8');
  stream.on('data', respondWithContent.bind(cutOptions, onComplete));
  stream.on('error', respondWithError.bind(null, onComplete));
  return;
};

const executeCut = function(cmdLineArgs, fileReadStream, stdin, onComplete) {
  const { cutOptions, error } = parseCmdLineArgs(cmdLineArgs);
  if (error) return onComplete(error, EMPTY_STRING);
  const stream = selectStream(cutOptions.fileName, fileReadStream, stdin);
  return onStream(stream, cutOptions, onComplete);
};

module.exports = { executeCut };
