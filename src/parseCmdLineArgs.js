'use strict';

const parseCmdLineArgs = function(args) {
  const field = args[args.indexOf('-f') + 1];
  const { error } = validateArgs(args, field);
  if (error) return { error };
  const separator = args[args.indexOf('-d') + 1];
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
  if (+field === 0) return { error: errorMessage.zeroField };
  if (field === undefined) return { error: errorMessage.undefinedField };
  if (!Number.isInteger(+field)) return { error: errorMessage.notNumber };
  return {};
};

module.exports = { parseCmdLineArgs };
