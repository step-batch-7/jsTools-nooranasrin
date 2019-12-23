const assert = require("chai").assert;
const { handleCmdLineArg } = require("../src/executeCommand");

describe("handleCmdLineArg", () => {
  it("should give the 2nd field of the given file ", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2", "1", "2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
  it("should give the line when the separator is not present", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTests/numbers.txt"];
    const expected = ["2", "2", "1", "2", "2"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
  it("should give the error message when the file is not present", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "2", "./appTest/numbers.txt"];
    const expected = ["cut: ./appTest/numbers.txt: No such file or directory"];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
  it("should give the 2nd and 3rd field of the given file ", () => {
    const cmdLineArg = [
      "node",
      "cut.js",
      "-f",
      "2,3",
      "./appTests/numbers.txt"
    ];
    const expected = ["2  3", "2  ", "1", "2  3", "2  "];
    assert.deepStrictEqual(handleCmdLineArg(cmdLineArg), expected);
  });
});
