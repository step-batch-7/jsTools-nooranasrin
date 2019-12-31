const assert = require('chai').assert;
const sinon = require('sinon');
const { executeCut } = require('../src/executeCommand');
describe('executeCut', () => {
  afterEach(() => sinon.restore());
  it('should give corresponding error message when -f is missing', () => {
    const onComplete = sinon.stub();
    const inputStreams = { createReadStream: '', stdin: '' };
    const actual = executeCut([], inputStreams, onComplete);
    assert.deepStrictEqual(actual, undefined);
    assert(
      onComplete.calledWithExactly('usage: cut -f list [-d delim] [file]', '')
    );
  });

  it('should give error message when the file is not existing', done => {
    const onComplete = sinon.fake(() => done());
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.secondCall.args[1]({ code: 'ENOENT' });
    assert.isTrue(onComplete.calledWithExactly('cut: No such file or directory', ''));
  });

  it('should give ENOENT error when the error code is not expected', done => {
    const onComplete = sinon.fake(() => done());
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.secondCall.args[1]({ code: 'ENOEN' });
    assert.isTrue(onComplete.calledWithExactly('cut: No such file or directory', ''));
  });

  it('should give expected fields when the file is existing', done => {
    const onComplete = sinon.fake(() => done());
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.firstCall.args[1]('1,2,3');
    assert.isTrue(onComplete.calledWithExactly('', '1'));
  });

  it('should give expected fields in case of stdin', done => {
    const onComplete = sinon.fake(() => done());
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createStdinStream = sinon.fake.returns(stdin);
    const inputStreams = { createStdinStream };
    executeCut(['-f', '1', '-d', ','], inputStreams, onComplete);
    assert(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'error');
    assert.isTrue(stdin.on.calledTwice);
    stdin.on.firstCall.args[1]('1,2,3');
    assert.isTrue(onComplete.calledWithExactly('', '1'));
  });
});
