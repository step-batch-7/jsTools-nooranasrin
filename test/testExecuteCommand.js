const assert = require("chai").assert;
const {
  extractFieldContents,
  handleCmdLineArgs,
  formatMsg
} = require("../src/executeCommand");

describe("extractFieldContents", () => {
  it("should give the 2nd field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2"];
    assert.deepStrictEqual(
      extractFieldContents(cmdLineArg, fsTools, "./test/testFile"),
      expected
    );
  });
  it("should give the line when the separator is not present", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2"];
    assert.deepStrictEqual(
      extractFieldContents(cmdLineArg, fsTools, "./test/testFile"),
      expected
    );
  });
  it("should give the error message when the file is not present", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFie", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTest/numbers.txt"];
    const expected = ["cut: ./test/testFile: No such file or directory"];
    assert.deepStrictEqual(
      extractFieldContents(cmdLineArg, fsTools, "./test/testFile"),
      expected
    );
  });
  it("should give the 2nd and 3rd field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = [
      "node",
      "cut.js",
      "-f",
      "2,3",
      "./appTests/numbers.txt"
    ];
    const expected = ["2", "2	3"];
    assert.deepStrictEqual(
      extractFieldContents(cmdLineArg, fsTools, "./test/testFile"),
      expected
    );
  });
  it("should give the extracted fields when the separator is present in the command line arguments", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = [
      "node",
      "cut.js",
      "-d",
      ",",
      "-f",
      "2",
      "./appTests/numbers.txt"
    ];
    const expected = ["2", "2"];
    assert.deepStrictEqual(
      extractFieldContents(cmdLineArg, fsTools, "./test/testFile"),
      expected
    );
  });
});

describe("handleCmdLineArgs", () => {
  it("should give specified field contents for each of the file", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cmdLineArg = [
      "node",
      "cut.js",
      "-d",
      ",",
      "-f",
      "2",
      "./test/testFile",
      "./test/testFile"
    ];
    const fileNames = ["./test/testFile", "./test/testFile"];
    const expected = ["2\n2", "2\n2"];
    const actual = handleCmdLineArgs(cmdLineArg, fsTools, fileNames);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("formatMsg", () => {
  it("should format the given line", () => {
    const separator = ",";
    const line = ["1", "2"];
    assert.deepStrictEqual(formatMsg(separator, line), "1,2");
  });
  it("should remove undefined from the end", () => {
    const separator = ",";
    const line = ["1", "2", undefined];
    assert.deepStrictEqual(formatMsg(separator, line), "1,2");
  });
});
