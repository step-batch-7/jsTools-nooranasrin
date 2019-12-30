const assert = require('chai').assert;
const EventEmitter = require('events');
const sinon = require('sinon');
const { executeCut } = require('../src/executeCommand');
describe('executeCut', () => {
  it('should give corresponding error message when -f is missing', () => {
    const onComplete = sinon.stub();
    const inputStreams = { createReadStream: '', stdin: '' };
    const actual = executeCut([], inputStreams, onComplete);
    assert.deepStrictEqual(actual, undefined);
    assert(
      onComplete.calledWithExactly('usage: cut -f list [-d delim] [file]', '')
    );
  });

  it('should give error message when the file is not existing', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const eventEmitter = new EventEmitter();
    eventEmitter.setEncoding = sinon.spy();
    const createReadStream = sinon.fake.returns(eventEmitter);
    const inputStreams = { createReadStream, stdin: '' };
    executeCut(userArgs, inputStreams, onComplete);
    assert(createReadStream.calledOnceWithExactly('fileName'));
    eventEmitter.emit('error', { code: 'ENOENT' });
    assert(onComplete.calledWithExactly('cut: No such file or directory', ''));
  });

  it('should give ENOENT error when the error code is not expected', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const eventEmitter = new EventEmitter();
    eventEmitter.setEncoding = sinon.spy();
    const createReadStream = sinon.fake.returns(eventEmitter);
    const inputStreams = { createReadStream, stdin: '' };
    executeCut(userArgs, inputStreams, onComplete);
    assert(createReadStream.calledOnceWithExactly('fileName'));
    eventEmitter.emit('error', { code: 'ENOEN' });
    assert(onComplete.calledWithExactly('cut: No such file or directory', ''));
  });

  it('should give expected fields when the file is existing', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const eventEmitter = new EventEmitter();
    eventEmitter.setEncoding = sinon.spy();
    const createReadStream = sinon.fake.returns(eventEmitter);
    const inputStreams = { createReadStream, stdin: '' };
    executeCut(userArgs, inputStreams, onComplete);
    assert(createReadStream.calledOnceWithExactly('fileName'));
    eventEmitter.emit('data', '1,2,3,4\n2,3');
    assert(onComplete.calledOnceWithExactly('', '1\n2'));
  });

  it('should give expected fields in case of stdin', () => {
    const userArgs = ['-f', '1', '-d', ','];
    const onComplete = sinon.stub();
    const stdin = new EventEmitter();
    stdin.setEncoding = sinon.spy();
    const inputStreams = { createReadStream: '', stdin };
    executeCut(userArgs, inputStreams, onComplete);
    stdin.emit('data', '1,2,3,4\n2,3');
    assert(onComplete.calledOnceWithExactly('', '1\n2'));
  });
});
