const assert = require("chai").assert;
const { executeCut } = require("../src/executeCommand");
describe("executeCut", () => {
  it("should give the corresponding error message  when the field is not given", () => {
    const read = function() {};

    const onComplete = () => {};
    const cmdLineArg = ["node", "cut.js", "2", "-d", ",", "./test/testFile"];
    const expected = undefined;
    assert.deepStrictEqual(executeCut(cmdLineArg, read, onComplete), expected);
  });
  it("should give the expected fields", () => {
    const cmdLineArg = [
      "node",
      "cut.js",
      "-f",
      "2",
      "-d",
      ",",
      "./test/testFile"
    ];
    const read = function(filePath, encoding, callBack) {
      assert.equal(filePath, "./test/testFile");
      assert.equal(encoding, "utf8");
      callBack(null, "1,2,3");
    };

    const onComplete = (error, content) => {
      assert.equal(error, "");
      assert.equal(content, "2");
    };

    const actual = executeCut(cmdLineArg, read, onComplete);
    assert.deepStrictEqual(actual, undefined);
  });
  it("should give error when the file is not exist", () => {
    const read = function(filePath, encoding, callBack) {
      assert.equal(filePath, "./test/testFile");
      assert.equal(encoding, "utf8");
      callBack("abcd", null);
    };

    const onComplete = (error, content) => {
      assert.equal(error, `cut: ./test/testFile: No such file or directory`);
      assert.equal(content, "");
    };

    const cmdLineArg = [
      "node",
      "cut.js",
      "-f",
      "2",
      "-d",
      ",",
      "./test/testFile"
    ];
    const actual = executeCut(cmdLineArg, read, onComplete);
    assert.deepStrictEqual(actual, undefined);
  });
});
