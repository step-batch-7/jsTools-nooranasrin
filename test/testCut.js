const assert = require('chai').assert;
const { Cut } = require('../src/cutLib');

describe('Cut', () => {
  describe('cutFields', () => {
    let cutTools;
    beforeEach(() => {
      cutTools = new Cut({
        '-d': ',',
        '-f': '3'
      });
    });
    it('should give expected field contents when delimiter is present', () => {
      const actual = cutTools.cutFields('1,2,3,4\n1,2,3,4');
      const expected = ['3', '3'];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give undefined when field is not present', () => {
      const actual = cutTools.cutFields('1,2,3,4,5,6\n1,2');
      const expected = ['3', undefined];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give the whole line when the delimiter is not present', () => {
      const actual = cutTools.cutFields('1;2;3;4\n1;2;3;4');
      const expected = ['1;2;3;4', '1;2;3;4'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
