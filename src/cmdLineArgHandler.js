const parseCmdLineArgs = function(args) {
  const field = args[args.indexOf("-f") + 1];
  const separator = args[args.indexOf("-d") + 1];
  const validity = validateArgs(args, field);
  if (!validity.isValid) return generateErrorMessage(validity.error);
  fileName = args[args.length - 1];
  return { cutOptions: { field, separator, fileName } };
};

const generateErrorMessage = function(errorType, option) {
  const messages = {
    fieldMissing: `usage: cut -f list [-d delim] [file]`,
    zeroField: `cut: [-cf] list: values may not include zero`,
    notNumber: `cut: [-cf] list: illegal list value`,
    undefinedField: `cut: option requires an argument -- f\nusage:cut -f list [-s] [-d delim] [file ...]`,
    fileMissing: `cut: ${option}: No such file or directory`
  };
  return { error: messages[errorType] };
};

const validateArgs = function(args, field) {
  if (!args.includes("-f")) return { isValid: false, error: "fieldMissing" };
  if (+field === 0) return { isValid: false, error: "zeroField" };
  if (field === undefined) return { isValid: false, error: "undefinedField" };
  if (!Number.isInteger(+field)) return { isValid: false, error: "notNumber" };
  return { isValid: true };
};

module.exports = {
  parseCmdLineArgs,
  generateErrorMessage,
  validateArgs
};
