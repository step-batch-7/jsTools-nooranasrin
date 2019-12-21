const splitFields = function(field, fieldContents, line) {
  const contentList = line.split("  ");
  if (contentList.length === 1) {
    fieldContents.push(contentList[0]);
    return fieldContents;
  }
  fieldContents.push(contentList[+field - 1]);
  return fieldContents;
};

const getSplittedFields = function(cutInfo) {
  const lines = cutInfo.lines;
  const field = cutInfo.field;
  return lines.reduce(splitFields.bind(null, field), []);
};

const getField = function(cmdLineArg) {
  const field = cmdLineArg[cmdLineArg.indexOf(`-f`) + 1];
  return { field };
};

module.exports = { splitFields, getSplittedFields, getField };
