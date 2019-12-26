const assert = require("chai").assert;
const { executeCut, handleCmdLineArg } = require("../src/executeCommand");
describe("executeCut", () => {
  it("should give the corresponding error message  when the field is not given", () => {
    const read = function() {};

    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = ["node", "cut.js", "2", "-d", ",", "./test/testFile"];
    const expected = undefined;
    assert.deepStrictEqual(executeCut(cmdLineArg, fsTools, print), expected);
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
      callBack("abcd", null);
    };

    const showError = error => {
      assert.equal(error, `cut: ./test/testFile: No such file or directory`);
    };
    const showFields = () => {};
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };
    const actual = executeCut(cmdLineArg, fsTools, print);
    assert.deepStrictEqual(actual, undefined);
  });
});

describe("handleCmdLineArg", () => {
  it("should extract the specified fields", () => {
    const read = function(filePath, encoding, callBack) {
      assert.equal(filePath, "./test/testFile");
      assert.equal(encoding, "utf8");
      callBack(null, "1,2\n1,2");
    };

    const showError = () => {};
    const showFields = field => {
      assert.equal(field, "2\n2");
    };
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = { fileName: "./test/testFile", field: "2", separator: "," };
    const actual = handleCmdLineArg(cutInfo, fsTools, print);
    assert.deepStrictEqual(actual, undefined);
  });
  it("should give error when the file is not exist", () => {
    const read = function(filePath, encoding, callBack) {
      assert.equal(filePath, "./test/testFile");
      assert.equal(encoding, "utf8");
      callBack("abcd", null);
    };

    const showError = error => {
      assert.equal(error, `cut: ./test/testFile: No such file or directory`);
    };
    const showFields = () => {};
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = { fileName: "./test/testFile" };
    const actual = handleCmdLineArg(cutInfo, fsTools, print);
    assert.deepStrictEqual(actual, undefined);
  });
});
