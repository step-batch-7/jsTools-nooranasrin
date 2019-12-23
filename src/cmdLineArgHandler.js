const generateFieldList = function(cutInfo, fieldRange) {
  let range = [];
  for (let index = +fieldRange[0]; index <= fieldRange[1]; index++) {
    range.push(index.toString());
  }
  cutInfo.fields = range;
  return cutInfo;
};

const extractFields = function(cutInfo, cmdLineArg) {
  cutInfo.fields = [cmdLineArg[cmdLineArg.indexOf(`-f`) + 1]];
  const fields = cutInfo.fields[0].split(",").sort();
  let fieldRange = cutInfo.fields[0].split("-").sort();
  if (fields.length > 1) cutInfo.fields = fields;
  if (fieldRange.length > 1) cutInfo = generateFieldList(cutInfo, fieldRange);
  return cutInfo;
};

const extractFileName = function(cmdLineArg) {
  if (!cmdLineArg.includes("-d")) return cmdLineArg.slice(4);
  return cmdLineArg.slice(6);
};

const extractSeparator = function(cmdLineArg, cutInfo) {
  cutInfo.separator = cmdLineArg[cmdLineArg.indexOf("-d") + 1];
  if (!cmdLineArg.includes("-d")) cutInfo.separator = "	";
  return cutInfo;
};

module.exports = {
  generateFieldList,
  extractFields,
  extractFileName,
  extractSeparator
};
