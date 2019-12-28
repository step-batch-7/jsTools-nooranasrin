'use strict';

const parseCmdLineArgs = function(args) {
  const field = args[args.indexOf('-f') + 1];
  const separator = args[args.indexOf('-d') + 1];
  const { error } = validateArgs(args, field);
  if (error) return { error };
  const fileName = args[6];
  return { cutOptions: { field, separator, fileName } };
};

const errorMessage = {
  fieldMissing: `usage: cut -f list [-d delim] [file]`,
  zeroField: `cut: [-cf] list: values may not include zero`,
  notNumber: `cut: [-cf] list: illegal list value`,
  undefinedField: `cut: option requires an argument -- f\nusage:cut -f list [-s] [-d delim] [file ...]`
};

const validateArgs = function(args, field) {
  if (!args.includes('-f')) return { error: errorMessage.fieldMissing };
  if (!/^[0-9]*[1-9][0-9]*$/.test(field)) return getFieldError(field);
  return {};
};

const getFieldError = function(field) {
  const errors = [
    [/^0*$/, errorMessage.zeroField],
    [/^undefined$/, errorMessage.undefinedField],
    [/[^(0-9)]/, errorMessage.notNumber]
  ];
  const error = errors.find(errorPair => errorPair[0].test(field));
  return { error: error[1] };
};

module.exports = { parseCmdLineArgs };
