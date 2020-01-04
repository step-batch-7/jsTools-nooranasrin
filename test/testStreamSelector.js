const assert = require('chai').assert;
const sinon = require('sinon');
const {StreamSelector} = require('../src/streamSelector');

describe('StreamSelector', () => {
  let stdin, createReadStream, streamSelector;

  beforeEach(() => {
    stdin = {};
    createReadStream = sinon.stub().withArgs('filePath');
    createReadStream.returns({fileName: 'filePath'});
    streamSelector = new StreamSelector(stdin, createReadStream);
  });

  it('should select createReadStream in case of file ', () => {
    const expected = {fileName: 'filePath'};
    assert.deepStrictEqual(streamSelector.select('filePath'), expected);
  });

  it('should select stdin in the absence of file ', () => {
    assert.deepStrictEqual(streamSelector.select(), {});
  });
});
