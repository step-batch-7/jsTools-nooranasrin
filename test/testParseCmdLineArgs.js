const assert = require("chai").assert;
const { parseCmdLineArgs } = require("../src/parseCmdLineArgs");

describe("parseCmdLineArgs", () => {
  it("should give an object containing the field value,separator and fileName", () => {
    const cmdLineArg = ["node", "-f", "3", "-d", ",", "cut.js"];
    const expected = {
      cutOptions: { field: "3", separator: ",", fileName: undefined }
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
  it("should give corresponding error when -f is not present", () => {
    const args = ["node", "cut.js", "4", "-d", ",", "numbers.js"];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: `usage: cut -f list [-d delim] [file]`
    });
  });
  it("should give corresponding error when field is undefined", () => {
    const args = ["node", "cut.js", "-f"];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: `cut: option requires an argument -- f\nusage:cut -f list [-s] [-d delim] [file ...]`
    });
  });
  it("should give corresponding error when field is not a number", () => {
    const args = ["node", "cut.js", "-f", "ads"];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: `cut: [-cf] list: illegal list value`
    });
  });
  it("should give corresponding error when field is 0", () => {
    const args = ["node", "cut.js", "-f", "0"];
    const actual = parseCmdLineArgs(args);
    assert.deepStrictEqual(actual, {
      error: `cut: [-cf] list: values may not include zero`
    });
  });
});
