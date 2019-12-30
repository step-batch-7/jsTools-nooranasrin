'use strict';

const getFieldContents = function(field, delimiter, line) {
  const unit = 1;
  const initialIndex = 0;
  const contentList = line.split(delimiter);
  if (contentList.length === unit) {
    return contentList[initialIndex];
  }
  return contentList[+field - unit];
};

const splitFields = function(cutDetails, contents) {
  const { field, delimiter } = cutDetails;
  const lines = contents.split('\n');
  return lines.map(getFieldContents.bind(null, field, delimiter));
};

module.exports = { splitFields };
