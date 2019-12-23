"use strict";

const splitFields = function(fields, separator, line) {
  const contentList = line.split(separator);
  if (contentList.length === 1) return [contentList[0]];
  return fields.map(field => contentList[+field - 1]);
};

const getSplittedFields = function(cutInfo) {
  const lines = cutInfo.lines;
  const fields = cutInfo.fields;
  const separator = cutInfo.separator;
  return lines.map(splitFields.bind(null, fields, separator));
};

module.exports = { splitFields, getSplittedFields };
