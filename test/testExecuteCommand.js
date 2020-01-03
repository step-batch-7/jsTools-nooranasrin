const assert = require('chai').assert;
const sinon = require('sinon');
const { executeCut } = require('../src/executeCommand');
describe('executeCut', () => {
  it('should give corresponding error message in the case of bad delimitor', () => {
    const onComplete = sinon.stub();
    const inputStreams = { createReadStream: '', stdin: '' };
    const actual = executeCut(['-f', '2', '-d', 'abc'], inputStreams, onComplete);
    assert.deepStrictEqual(actual, undefined);
    assert(
      onComplete.calledWithExactly('cut: bad delimiter', '')
    );
  });

  it('should give error message when the file is not existing', done => {
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streamSelector = {select: sinon.stub().withArgs('num.txt').returns(readStream)};
    const onComplete = sinon.fake(() => {
      assert.isTrue(onComplete.calledWithExactly('cut: No such file or directory', ''));
      done();
    });
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      streamSelector,
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(streamSelector.select('num.txt').on.firstCall.args[0], 'data');
    assert.strictEqual(streamSelector.select('num.txt').on.secondCall.args[0], 'error');
    assert.isTrue(streamSelector.select('num.txt').on.calledTwice);
    streamSelector.select('num.txt').on.secondCall.args[1]({ code: 'ENOENT' });
  });

  it('should give ENOENT error when the error code is not expected', done => {
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streamSelector = {select: sinon.stub().withArgs('num.txt').returns(readStream)};
    const onComplete = sinon.fake(() => {
      assert.isTrue(onComplete.calledWithExactly('cut: No such file or directory', ''));
      done();
    });
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      streamSelector,
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(streamSelector.select('num.txt').on.firstCall.args[0], 'data');
    assert.strictEqual(streamSelector.select('num.txt').on.secondCall.args[0], 'error');
    assert.isTrue(streamSelector.select('num.txt').on.calledTwice);
    streamSelector.select('num.txt').on.secondCall.args[1]({ code: 'ENOEN' });
  });

  it('should give expected fields when the file is existing', done => {
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streamSelector = {select: sinon.stub().withArgs('num.txt').returns(readStream)};
    const onComplete = sinon.fake(() => {
      assert.isTrue(onComplete.calledWithExactly('', '1'));
      done();
    });
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      streamSelector,
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(streamSelector.select('num.txt').on.firstCall.args[0], 'data');
    assert.strictEqual(streamSelector.select('num.txt').on.secondCall.args[0], 'error');
    assert.isTrue(streamSelector.select('num.txt').on.calledTwice);
    streamSelector.select('num.txt').on.firstCall.args[1]('1,2,3');
  });

  it('should give expected fields in case of stdin', done => {
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streamSelector = {select: sinon.stub().withArgs().returns(readStream)};
    const onComplete = sinon.fake(() => {
      assert.isTrue(onComplete.calledWithExactly('', '1'));
      done();
    });
    executeCut(['-f', '1', '-d', ','], streamSelector, onComplete);
    assert(streamSelector.select().setEncoding.calledWith('utf8'));
    assert.strictEqual(streamSelector.select().on.firstCall.args[0], 'data');
    assert.strictEqual(streamSelector.select().on.secondCall.args[0], 'error');
    assert.isTrue(streamSelector.select().on.calledTwice);
    streamSelector.select().on.firstCall.args[1]('1,2,3');
  });
});
