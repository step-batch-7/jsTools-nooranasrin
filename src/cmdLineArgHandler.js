const parseCmdLineArgs = function(cmdLineArgs) {
  const cutInfo = extractField(cmdLineArgs);
  cutInfo.separator = extractSeparator(cmdLineArgs);
  cutInfo.fileName = cmdLineArgs[cmdLineArgs.length - 1];
  return cutInfo;
};

const generateErrorMessage = function(errorType, option) {
  const messages = {
    fieldMissing: `usage: cut -f list [-d delim] [file]`,
    zeroField: `cut: [-cf] list: values may not include zero`,
    notNumber: `cut: [-cf] list: illegal list value`,
    undefinedField: `cut: option requires an argument -- ${option}\nusage:cut -f list [-s] [-d delim] [file ...]`
  };
  return { error: messages[errorType] };
};

const extractSeparator = function(args) {
  const separator = args[args.indexOf("-d") + 1];
  if (separator === undefined)
    return generateErrorMessage("undefinedField", "d");
  return separator;
};

const extractField = function(args) {
  if (!args.includes("-f")) return generateErrorMessage("fieldMissing");
  const field = args[args.indexOf("-f") + 1];
  if (+field === 0) return generateErrorMessage("zeroField");
  if (field === undefined) return generateErrorMessage("undefinedField", "f");
  if (!Number.isInteger(+field)) return generateErrorMessage("notNumber");
  return { field };
};

module.exports = {
  parseCmdLineArgs,
  extractField,
  extractSeparator,
  generateErrorMessage
};
