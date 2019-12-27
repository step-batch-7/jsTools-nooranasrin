const assert = require('chai').assert;
const EventEmitter = require('events');
const sinon = require('sinon');
const { executeCut } = require('../src/executeCommand');
describe('executeCut', () => {
  it('should give corresponding error message when -f is missing', () => {
    const fileReadStream = new EventEmitter();
    const stdin = new EventEmitter();
    const cmdLineArgs = ['node'];
    const expected = undefined;
    const onComplete = sinon.stub();
    const actual = executeCut(cmdLineArgs, fileReadStream, stdin, onComplete);
    assert.deepStrictEqual(actual, expected);
    onComplete.withArgs(`usage: cut -f list [-d delim] [file]`, '');
  });

  it('should give corresponding error message when the file is not existing', () => {
    const userArgs = ['node', 'cut.js', '-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const eventEmitter = new EventEmitter();
    const stdin = new EventEmitter();
    eventEmitter.setEncoding = sinon.spy();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      eventEmitter.path = 'fileName';
      return eventEmitter;
    };
    executeCut(userArgs, readFileStream, stdin, onComplete);
    eventEmitter.emit('error', { code: 'ENOENT' });
    onComplete.withArgs(`cut: No such file or directory`, '');
  });

  it('should give ENOENT error message when the error code is not expected', () => {
    const userArgs = ['node', 'cut.js', '-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const eventEmitter = new EventEmitter();
    const stdin = new EventEmitter();
    eventEmitter.setEncoding = sinon.spy();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      eventEmitter.path = 'fileName';
      return eventEmitter;
    };
    executeCut(userArgs, readFileStream, stdin, onComplete);
    eventEmitter.emit('error', { code: 'ENOEN' });
    onComplete.withArgs(`cut: No such file or directory`, '');
  });

  it('should give expected fields when the file is existing', () => {
    const userArgs = ['node', 'cut.js', '-f', '1', '-d', ',', 'fileName'];
    const onComplete = sinon.stub();
    const fileStream = new EventEmitter();
    const stdin = new EventEmitter();
    fileStream.setEncoding = sinon.spy();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      fileStream.path = 'fileName';
      return fileStream;
    };
    executeCut(userArgs, readFileStream, stdin, onComplete);
    fileStream.emit('data', '1,2,3,4\n2,3');
    onComplete.withArgs('', '1\n2');
  });

  it('should give expected fields in case of stdin', () => {
    const userArgs = ['node', 'cut.js', '-f', '1', '-d', ','];
    const onComplete = sinon.stub();
    const stdin = new EventEmitter();
    stdin.setEncoding = sinon.spy();
    const readFileStream = new EventEmitter();
    executeCut(userArgs, readFileStream, stdin, onComplete);
    stdin.emit('data', '1,2,3,4\n2,3');
    onComplete.withArgs('', '1\n2');
  });
});
