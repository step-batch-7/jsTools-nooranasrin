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

const getFileContent = function(fileInfo) {
  const exist = fileInfo.exist;
  const fileName = fileInfo.fileName;
  if (!exist(fileName)) return [`cut: ${fileName}: No such file or directory`];
  return fileInfo.read(fileName, fileInfo.encoding).split("\n");
};

module.exports = { splitFields, getSplittedFields, getField, getFileContent };
