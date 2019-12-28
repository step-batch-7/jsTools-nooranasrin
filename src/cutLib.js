'use strict';

const getFieldContents = function(field, separator, line) {
  const unit = 1;
  const initialIndex = 0;
  const contentList = line.split(separator);
  if (contentList.length === unit) {
    return contentList[initialIndex];
  }
  return contentList[+field - unit];
};

const splitFields = function(cutDetails, contents) {
  const { field, separator } = cutDetails;
  const lines = contents.split('\n');
  return lines.map(getFieldContents.bind(null, field, separator));
};

module.exports = { splitFields };
