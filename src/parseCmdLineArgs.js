'use strict';

const parseCmdLineArgs = function(args) {
  const unit = 1;
  const fileNamePosition = 6;
  const field = args[args.indexOf('-f') + unit];
  const { error } = validateArgs(args, field);
  if (error) {
    return { error };
  }
  const delimiter = getDelimiter(args);
  const fileName = args[fileNamePosition];
  return { cutOptions: { field, delimiter, fileName } };
};

const getDelimiter = function(args) {
  const unit = 1;
  const delimiterPosition = args.indexOf('-d');
  return delimiterPosition === -unit ? '\t' : args[delimiterPosition + unit];
};

const errorMessage = {
  fieldMissing: 'usage: cut -f list [-d delim] [file]',
  zeroField: 'cut: [-cf] list: values may not include zero',
  notNumber: 'cut: [-cf] list: illegal list value'
};

const validateArgs = function(args, field) {
  const fieldZero = 0;
  if (!args.includes('-f')) {
    return { error: errorMessage.fieldMissing };
  }
  if (+field === fieldZero) {
    return { error: errorMessage.zeroField };
  }
  if (!Number.isInteger(+field)) {
    return { error: errorMessage.notNumber };
  }
  return {};
};

module.exports = { parseCmdLineArgs };
