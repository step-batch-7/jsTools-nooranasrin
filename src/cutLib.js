"use strict";

const getFieldContents = function(contentList, field) {
  const content = contentList[+field - 1];
  if (!content) return "";
  return content;
};

const splitFields = function(fields, line) {
  const contentList = line.split("  ");
  if (contentList.length === 1) {
    return [contentList[0]];
  }
  return fields.map(getFieldContents.bind(null, contentList));
};

const getSplittedFields = function(cutInfo) {
  const lines = cutInfo.lines;
  const fields = cutInfo.fields;
  return lines.map(splitFields.bind(null, fields));
};

const generateFieldList = function(cutInfo, fieldRange) {
  let range = [];
  fieldRange = fieldRange.sort();
  for (let index = +fieldRange[0]; index <= fieldRange[1]; index++) {
    range.push(index.toString());
  }
  cutInfo.fields = range;
  return cutInfo;
};

const getFields = function(cutInfo, cmdLineArg) {
  cutInfo.fields = [cmdLineArg[cmdLineArg.indexOf(`-f`) + 1]];
  const fields = cutInfo.fields[0].split(",").sort();
  let fieldRange = cutInfo.fields[0].split("-");
  if (fields.length > 1) cutInfo.fields = fields;
  if (fieldRange.length > 1) cutInfo = generateFieldList(cutInfo, fieldRange);
  return cutInfo;
};

const getFileName = function(cmdLineArg) {
  return cmdLineArg[4];
};

module.exports = {
  splitFields,
  getSplittedFields,
  getFields,
  getFileName,
  getFieldContents,
  generateFieldList
};
