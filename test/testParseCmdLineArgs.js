const assert = require('chai').assert;
const { parseCmdLineArgs } = require('../src/parseCmdLineArgs');

describe('parseCmdLineArgs', () => {
  it('should give an object having the field,delimiter and fileName', () => {
    const cmdLineArg = ['-f', '3', '-d', ',', 'cut.js'];
    const expected =  {'-f': '3', '-d': ',', fileName: 'cut.js' };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });

  it('should give delimiter tab when the -d option is not given', () => {
    const cmdLineArg = ['-f', '3', 'cut.js'];
    const expected = { '-f': '3', '-d': '\t', fileName: 'cut.js' };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
});

