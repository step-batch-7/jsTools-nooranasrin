const parseCmdLineArgs = function(cmdLineArgs) {
  let cutInfo = extractField(cmdLineArgs);
  cutInfo = extractSeparator(cmdLineArgs, cutInfo);
  cutInfo.fileName = cmdLineArgs[cmdLineArgs.length - 1];
  return cutInfo;
};

const generateErrorMessage = function(errorType, option) {
  const messages = {
    fieldMissing: `usage: cut -f list [-d delim] [file]`,
    zeroField: `cut: [-cf] list: values may not include zero`,
    notNumber: `cut: [-cf] list: illegal list value`,
    undefinedField: `cut: option requires an argument -- ${option}\nusage:cut -f list [-s] [-d delim] [file ...]`,
    fileMissing: `cut: ${option}: No such file or directory`
  };
  return { error: messages[errorType] };
};

const extractSeparator = function(args, cutInfo) {
  const separator = args[args.indexOf("-d") + 1];
  if (separator === undefined)
    return generateErrorMessage("undefinedField", "d");
  cutInfo.separator = separator;
  return cutInfo;
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
