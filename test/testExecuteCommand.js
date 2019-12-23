const assert = require("chai").assert;
const { handleCmdLineArg } = require("../src/executeCommand");

describe("handleCmdLineArg", () => {
  it("should give the 2nd field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg, fsTools), expected);
  });
  it("should give the line when the separator is not present", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg, fsTools), expected);
  });
  it("should give the error message when the file is not present", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFie", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTest/numbers.txt"];
    const expected = ["cut: ./test/testFile: No such file or directory"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg, fsTools), expected);
  });
  it("should give the 2nd and 3rd field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
    };

    const cmdLineArg = [
      "node",
      "cut.js",
      "-f",
      "2,3",
      "./appTests/numbers.txt"
    ];
    const expected = ["2	", "2	3"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg, fsTools), expected);
  });
  it("should give the extracted fields when the separator is present in the command line arguments", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    let fsTools = {
      read: read,
      encoding: "utf8",
      fileName: "./test/testFile"
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
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg, fsTools), expected);
  });
});
