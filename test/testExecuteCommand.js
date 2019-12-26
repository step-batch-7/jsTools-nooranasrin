const assert = require("chai").assert;
const { executeCut, loadContents } = require("../src/executeCommand");
describe("executeCut", () => {
  it("should give the specified field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = ["node", "cut.js", "-f", "2", "-d", ",", "./test/testFile"];
    const expected = undefined;
    assert.deepStrictEqual(executeCut(cutInfo, fsTools, print), expected);
  });
  it("should give the corresponding error message  when the field is not given", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = ["node", "cut.js", "2", "-d", ",", "./test/testFile"];
    const expected = undefined;
    assert.deepStrictEqual(executeCut(cutInfo, fsTools, print), expected);
  });
  it("should give the corresponding error message  when the file is missing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };

    const cutInfo = ["node", "cut.js", "-f", "2", "-d", ",", "./test/testFile"];
    const expected = undefined;
    assert.deepStrictEqual(executeCut(cutInfo, fsTools), expected);
  });
});

describe("loadContents", () => {
  it("should give error when error is present", () => {
    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };
    const error = "";
    const loadContent = loadContents.bind({});
    const actual = loadContent(print, error);
    assert.strictEqual(actual, undefined);
  });
  it("should give content when error is present", () => {
    const showError = () => {};
    const showFields = () => {};
    const print = { showError, showFields };
    const content = "abcde";
    const error = undefined;
    const loadContent = loadContents.bind({});
    const actual = loadContent(print, error, content);
    assert.strictEqual(actual, undefined);
  });
});
