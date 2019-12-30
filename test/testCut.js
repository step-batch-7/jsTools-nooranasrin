const assert = require('chai').assert;
const cut = require('../src/cutLib');
const { splitFields } = cut;

describe('splitFields', () => {
  it('should give the line when the delimiter is not present', () => {
    const cutDetails = {
      field: 2,
      delimiter: ';'
    };
    const contents = '1,2,3';
    const actual = splitFields(cutDetails, contents);
    assert.deepStrictEqual(actual, ['1,2,3']);
  });
  it('should give the field contents when the delimiter is present', () => {
    const cutDetails = {
      field: 2,
      delimiter: ','
    };
    const contents = '1,2,3';
    const actual = splitFields(cutDetails, contents);
    assert.deepStrictEqual(actual, ['2']);
  });
});
