'use strict';
const { Cut } = require('./cutLib');
const { parseCmdLineArgs } = require('./parseCmdLineArgs');
const EMPTY_STRING = '';

const errors = {
  ENOENT: 'cut: No such file or directory',
  EISDIR: 'cut: Error reading',
  EACCES: 'cut: Permission denied'
};

const loadLine = function(stream, cutTools, onComplete) {
  stream.setEncoding('utf8');
  stream.on('data', content => {
    const requiredFields = cutTools.cutFields(content).join('\n');
    onComplete('', requiredFields);
  });
  stream.on('error', error =>
    onComplete(errors[error.code] || errors['ENOENT'], EMPTY_STRING)
  );
};

const executeCut = function(cmdLineArgs, streamSelector, onComplete) {
  const { cutOptions, error } = parseCmdLineArgs(cmdLineArgs);
  if (cutOptions) {
    const cutTools = new Cut(cutOptions);
    const stream = streamSelector.select(cutOptions.fileName);
    loadLine(stream, cutTools, onComplete);
  } else{
    onComplete(error, EMPTY_STRING);
  }
};

module.exports = { executeCut };
