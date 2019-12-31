const assert = require('chai').assert;
const sinon = require('sinon');
const { executeCut } = require('../src/executeCommand');
describe('executeCut', () => {
  it('should give corresponding error message when -f is missing', () => {
    afterEach(() => sinon.restore());
    const onComplete = sinon.stub();
    const inputStreams = { createReadStream: '', stdin: '' };
    const actual = executeCut([], inputStreams, onComplete);
    assert.deepStrictEqual(actual, undefined);
    assert(
      onComplete.calledWithExactly('usage: cut -f list [-d delim] [file]', '')
    );
  });

  it('should give error message when the file is not existing', done => {
    afterEach(() => sinon.restore());
    const onComplete = function(error, content) {
      assert.strictEqual(error, 'cut: No such file or directory');
      assert.strictEqual(content, '');
      done();
    };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream, stdin: '' },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.secondCall.args[1]({ code: 'ENOENT' });
  });

  it('should give ENOENT error when the error code is not expected', done => {
    afterEach(() => sinon.restore());
    const onComplete = function(error, content) {
      assert.strictEqual(error, 'cut: No such file or directory');
      assert.strictEqual(content, '');
      done();
    };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream, stdin: '' },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.secondCall.args[1]({ code: 'ENOEN' });
  });

  it('should give expected fields when the file is existing', done => {
    afterEach(() => sinon.restore());
    const onComplete = function(error, content) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '1');
      done();
    };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    executeCut(
      ['-f', '1', '-d', ',', 'num.txt'],
      { createReadStream, stdin: '' },
      onComplete
    );
    assert(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'error');
    assert.isTrue(readStream.on.calledTwice);
    readStream.on.firstCall.args[1]('1,2,3');
  });

  it('should give expected fields in case of stdin', done => {
    afterEach(() => sinon.restore());
    const onComplete = function(error, content) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '1');
      done();
    };
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const inputStreams = { createReadStream: '', stdin };
    executeCut(['-f', '1', '-d', ','], inputStreams, onComplete);
    assert(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'error');
    assert.isTrue(stdin.on.calledTwice);
    stdin.on.firstCall.args[1]('1,2,3');
  });
});
