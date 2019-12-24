"use strict";

const getFieldContents = function(field, line) {
  const contentList = line.split("\t");
  if (contentList.length === 1) return contentList[0];
  return contentList[+field - 1];
};

const splitFields = function(cutInfo) {
  const lines = cutInfo.contents.lines;
  const field = cutInfo.field;
  return lines.map(getFieldContents.bind(null, field));
};

module.exports = { getFieldContents, splitFields };
