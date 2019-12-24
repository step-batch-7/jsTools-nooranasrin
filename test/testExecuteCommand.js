const assert = require("chai").assert;
const { executeCut } = require("../src/executeCommand");
describe("executeCut", () => {
  it("should give the specified field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = ["node", "cut.js", "-f", "2", "-d", ",", "./test/testFile"];
    const expected = { msg: ["2", "2"] };
    assert.deepStrictEqual(executeCut(cutInfo, fsTools), expected);
  });
  it("should give the corresponding error message  when the field is not given", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = ["node", "cut.js", "2", "-d", ",", "./test/testFile"];
    const expected = { error: `usage: cut -f list [-d delim] [file]` };
    assert.deepStrictEqual(executeCut(cutInfo, fsTools), expected);
  });
  it("should give the corresponding error message  when the file is missing", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFie", path);
      assert.strictEqual("utf8", encoding);
      return "1,2\n1,2,3";
    };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = ["node", "cut.js", "-f", "2", "-d", ",", "./test/testFile"];
    const expected = {
      error: `cut: ./test/testFile: No such file or directory`
    };
    assert.deepStrictEqual(executeCut(cutInfo, fsTools), expected);
  });
});
