const assert = require("chai").assert;
const { parseCmdLineArgs } = require("../src/cmdLineArgHandler");

describe("parseCmdLineArgs", () => {
  it("should give an object containing the field value and fileName", () => {
    const cmdLineArg = ["node", "-f", "3", "cut.js"];
    const expected = {
      field: "3",
      fileName: "cut.js"
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
});
