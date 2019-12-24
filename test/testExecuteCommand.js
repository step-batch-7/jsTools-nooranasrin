const assert = require("chai").assert;
const { executeCut } = require("../src/executeCommand");
describe("extractFieldContents", () => {
  it("should give the 2nd field of the given file ", () => {
    const read = function(path, encoding) {
      assert.strictEqual("./test/testFile", path);
      assert.strictEqual("utf8", encoding);
      return "1	2\n1	2	3";
    };

    const fsTools = {
      read: read,
      encoding: "utf8"
    };

    const cutInfo = { field: "2", fileName: "./test/testFile" };
    const expected = { msg: ["2", "2"] };
    assert.deepStrictEqual(executeCut(cutInfo, fsTools), expected);
  });
});
