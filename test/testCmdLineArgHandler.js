const assert = require("chai").assert;
const {
  parseCmdLineArgs,
  generateErrorMessage,
  validateArgs
} = require("../src/cmdLineArgHandler");

describe("parseCmdLineArgs", () => {
  it("should give an object containing the field value,separator and fileName", () => {
    const cmdLineArg = ["node", "-f", "3", "-d", ",", "cut.js"];
    const expected = {
      cutOptions: { field: "3", separator: ",", fileName: "cut.js" }
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
});

describe("generateErrorMessage", () => {
  it("should give the msg corresponding to the input", () => {
    const expected = { error: `usage: cut -f list [-d delim] [file]` };
    assert.deepStrictEqual(generateErrorMessage("fieldMissing"), expected);
  });
});

describe("validateArgs", () => {
  it("should give true when arguments are valid", () => {
    const args = ["node", "cut.js", "-f", "4", "-d", ",", "numbers.js"];
    const actual = validateArgs(args, "4");
    assert.deepStrictEqual(actual, { isValid: true });
  });
  it("should give false and error key when -f is not present", () => {
    const args = ["node", "cut.js", "4", "-d", ",", "numbers.js"];
    const actual = validateArgs(args, "4");
    assert.deepStrictEqual(actual, { isValid: false, error: "fieldMissing" });
  });
  it("should give false and error key when field is undefined", () => {
    const args = ["node", "cut.js", "-f"];
    const actual = validateArgs(args, undefined);
    assert.deepStrictEqual(actual, { isValid: false, error: "undefinedField" });
  });
  it("should give false and error key when field is not a number", () => {
    const args = ["node", "cut.js", "-f"];
    const actual = validateArgs(args, "abc");
    assert.deepStrictEqual(actual, { isValid: false, error: "notNumber" });
  });
  it("should give false and error key when field is 0", () => {
    const args = ["node", "cut.js", "-f"];
    const actual = validateArgs(args, "0");
    assert.deepStrictEqual(actual, { isValid: false, error: "zeroField" });
  });
});
