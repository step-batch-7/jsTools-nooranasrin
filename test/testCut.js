const assert = require("chai").assert;
const cut = require("../src/cutLib");
const { getSplittedFields, splitFields, getField, getFileContent } = cut;

describe("cutFields", () => {
  it("should give an array of string that contains specified field values", () => {
    let cutInfo = {
      field: 2,
      lines: ["123  123", "123  124"]
    };
    let actual = getSplittedFields(cutInfo);
    let expected = ["123", "124"];
    assert.deepStrictEqual(actual, expected);

    cutInfo = {
      field: 2,
      lines: ["123  123  123", "123  124  123"]
    };
    actual = getSplittedFields(cutInfo);
    expected = ["123", "124"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the line when the separator is not present", () => {
    const cutInfo = {
      field: 2,
      lines: ["123", "123"]
    };
    const actual = getSplittedFields(cutInfo);
    const expected = ["123", "123"];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getCutFields", () => {
  it("should give the line when the separator is not present", () => {
    const field = 2;
    const fieldContents = [];
    const line = "123 123";
    const actual = splitFields(field, fieldContents, line);
    assert.deepStrictEqual(actual, ["123 123"]);
  });
  it("should give the field contents when the separator is present", () => {
    const field = 2;
    const fieldContents = [];
    const line = "123  124";
    const actual = splitFields(field, fieldContents, line);
    assert.deepStrictEqual(actual, ["124"]);
  });
});

describe("getField", () => {
  it("should give an object containing the field value", () => {
    const cmdLineArg = ["node", "-f", "3"];
    assert.deepStrictEqual(getField(cmdLineArg), { field: "3" });
  });
});

describe("getFileContent", () => {
  it("should read the content of the file when the file is existing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "hello\nhello";
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return true;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    let expected = ["hello", "hello"];
    let actual = getFileContent(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the error message when the file is not existing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "{}";
    };

    const exist = function(path) {
      assert.strictEqual("./test/testFile", path);
      return false;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    let expected = [`cut: ./test/testFile: No such file or directory`];
    let actual = getFileContent(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });
});
