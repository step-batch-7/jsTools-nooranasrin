const { loadLines, getFsTools } = require("../src/fsOperationsLib");
const assert = require("chai").assert;
const fs = require("fs");

describe("loadLines", () => {
  it("should read the content of the file when the file is existing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "hello\nhello";
    };

    let fileOperations = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    let expected = { lines: ["hello", "hello"] };
    let actual = loadLines(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the error message when the file is not existing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFil", path);
      assert.strictEqual("utf8", encoding);
      return "{}";
    };

    let fileOperations = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    let expected = { err: `cut: ./test/testFile: No such file or directory` };
    let actual = loadLines(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getFsTools", () => {
  it("should give an object with specified format", () => {
    const expected = {
      fileName: "./test",
      read: fs.readFileSync,
      encoding: "utf8"
    };
    const actual = getFsTools("./test");
    assert.deepStrictEqual(actual, expected);
  });
});
