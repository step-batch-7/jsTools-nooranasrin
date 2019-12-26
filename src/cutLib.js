"use strict";

const getFieldContents = function(field, separator, line) {
  const contentList = line.split(separator);
  if (contentList.length === 1) return contentList[0];
  return contentList[+field - 1];
};

const splitFields = function(cutDetails) {
  const lines = cutDetails.lines;
  const field = cutDetails.field;
  const separator = cutDetails.separator;
  return lines.map(getFieldContents.bind(null, field, separator));
};

module.exports = { getFieldContents, splitFields };
