const assert = require("chai").assert;
const { handleCmdLineArg } = require("../src/executeCommand");

describe("handleCmdLineArg", () => {
  it("should return the 2nd field of the given file ", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "2", "./docs/numbers.txt"];
    const expected = ["2", "2", "1", "2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
  it("should return the line when the separator is not present", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "2", "./docs/numbers.txt"];
    const expected = ["2", "2", "1", "2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
});
