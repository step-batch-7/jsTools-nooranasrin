'use strict';

class Cut {
  constructor(cutOptions) {
    this.cutOptions = cutOptions;
    this.fieldNumber = cutOptions['-f'];
    this.delimiter = cutOptions['-d'];
  }

  validateOptions() {
    const fieldZero = 0;
    const delimiterLength = 1;
    if(+this.fieldNumber === fieldZero) {
      return { error: 'cut: [-cf] list: values may not include zero' };
    }
    if(!Number.isInteger(+this.fieldNumber)) {
      return { error: 'cut: [-cf] list: illegal list value' };
    }
    if(this.delimiter.length > delimiterLength) {
      return {error: 'cut: bad delimiter'};
    }
    return {};
  }

  cutFields(contents) {
    const lines = contents.split('\n');
    return lines.map(line => {
      const unit = 1;
      const initialIndex = 0;
      const contentList = line.split(this.delimiter);
      if (contentList.length === unit) {
        return contentList[initialIndex];
      }
      return contentList[+this.fieldNumber - unit];
    });
  }
}

module.exports = { Cut };
