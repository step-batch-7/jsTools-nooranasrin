'use strict';

const parseCmdLineArgs = function(args) {
  const unit = 1;
  const field = args[args.indexOf('-f') + unit];
  const { error } = validateArgs(args, field);
  if (error) {
    return { error };
  }
  const delimiter = getDelimiter(args);
  const fileName = getFileName(args);
  return { cutOptions: { field, delimiter, fileName } };
};

const getDelimiter = function(args) {
  const unit = 1;
  const delimiterPosition = args.indexOf('-d');
  return delimiterPosition === -unit ? '\t' : args[delimiterPosition + unit];
};

const getFileName = function(args) {
  const unit = 1;
  const filePosition1 = 4;
  const filePosition2 = 6;
  const delimiterPosition = args.indexOf('-d');
  if (delimiterPosition === -unit) {
    return args[filePosition1];
  }
  return args[filePosition2];
};

const validateArgs = function(args, field) {
  const fieldZero = 0;
  if (!args.includes('-f')) {
    return { error: 'usage: cut -f list [-d delim] [file]' };
  }
  if (+field === fieldZero) {
    return { error: 'cut: [-cf] list: values may not include zero' };
  }
  if (!Number.isInteger(+field)) {
    return { error: 'cut: [-cf] list: illegal list value' };
  }
  return {};
};

module.exports = { parseCmdLineArgs };
