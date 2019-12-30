const assert = require('chai').assert;
const { parseCmdLineArgs } = require('../src/parseCmdLineArgs');

describe('parseCmdLineArgs', () => {
  it('should give an object having the field,delimiter and fileName', () => {
    const cmdLineArg = ['-f', '3', '-d', ',', 'cut.js'];
    const expected = {
      cutOptions: { field: '3', delimiter: ',', fileName: 'cut.js' }
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
  it('should give corresponding error when -f is not present', () => {
    const args = ['4', '-d', ',', 'numbers.js'];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: 'usage: cut -f list [-d delim] [file]'
    });
  });
  it('should give corresponding error when field is not a number', () => {
    const args = ['-f', 'ads'];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: 'cut: [-cf] list: illegal list value'
    });
  });
  it('should give corresponding error when field is 0', () => {
    const args = ['-f', '0'];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: 'cut: [-cf] list: values may not include zero'
    });
  });

  it('should give delimiter tab when the -d option is not given', () => {
    const cmdLineArg = ['-f', '3', 'cut.js'];
    const expected = {
      cutOptions: { field: '3', delimiter: '\t', fileName: 'cut.js' }
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
});
