const assert = require('chai').assert;
const { Cut } = require('../src/cutLib');

describe('Cut', () => {
  describe('cutFields', () => {
    it('should give expected field contents when delimiter is present', () => {
      const cutTools = new Cut({
        '-d': ',',
        '-f': '2'
      });
      const actual = cutTools.cutFields('1,2,3,4\n1,2,3,4');
      const expected = ['2', '2'];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give undefined when field is not present', () => {
      const cutTools = new Cut({
        '-d': ',',
        '-f': '5'
      });
      const actual = cutTools.cutFields('1,2,3,4,5,6\n1,2,3,4');
      const expected = ['5', undefined];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give the whole line when the delimiter is not present', () => {
      const cutTools = new Cut({
        '-d': ':',
        '-f': '2'
      });
      const actual = cutTools.cutFields('1,2,3,4\n1,2,3,4');
      const expected = ['1,2,3,4', '1,2,3,4'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
