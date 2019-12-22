const getFieldContents = function(contentList, fieldContents, field) {
  if (contentList.length === 1) {
    fieldContents.push(contentList[0]);
    return fieldContents;
  }
  fieldContents.push(contentList[+field - 1]);
  return fieldContents;
};

const splitFields = function(fields, fieldContents, line) {
  const contentList = line.split("  ");
  return fields.reduce(getFieldContents.bind(null, contentList), fieldContents);
};

const getSplittedFields = function(cutInfo) {
  const lines = cutInfo.lines;
  const fields = cutInfo.fields;
  return lines.reduce(splitFields.bind(null, fields), []);
};

const getFields = function(cutInfo, cmdLineArg) {
  cutInfo.fields = [cmdLineArg[cmdLineArg.indexOf(`-f`) + 1]];
  const fields = cutInfo.fields[0].split(",");
  let fieldRange = cutInfo.fields[0].split("-");
  if (fields.length > 1) cutInfo.fields = fields;
  if (fieldRange.length > 1) {
    let range = [];
    fieldRange = fieldRange.sort();
    for (let index = +fieldRange[0]; index <= fieldRange[1]; index++) {
      range.push(index.toString());
    }
    cutInfo.fields = range;
  }
  return cutInfo;
};

const getFileName = function(cmdLineArg) {
  return cmdLineArg[4];
};

module.exports = {
  splitFields,
  getSplittedFields,
  getFields,
  getFileName
};
