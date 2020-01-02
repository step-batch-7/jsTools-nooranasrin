'use strict';

const extractFields = function(cutTools, line) {
  const unit = 1;
  const initialIndex = 0;
  const contentList = line.split(cutTools.delimiter);
  if (contentList.length === unit) {
    return contentList[initialIndex];
  }
  return contentList[+cutTools.fieldNumber - unit];
};

class Cut {
  constructor(cutOptions) {
    this.fieldNumber = cutOptions['-f'];
    this.delimiter = cutOptions['-d'];
  }

  cutFields(contents) {
    const lines = contents.split('\n');
    return lines.map(extractFields.bind(null, this));
  }
}

module.exports = { Cut };
