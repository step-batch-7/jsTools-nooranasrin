const assert = require("chai").assert;
const {
  parseCmdLineArgs,
  extractField,
  extractSeparator,
  generateErrorMessage
} = require("../src/cmdLineArgHandler");

describe("parseCmdLineArgs", () => {
  it("should give an object containing the field value,separator and fileName", () => {
    const cmdLineArg = ["node", "-f", "3", "-d", ",", "cut.js"];
    const expected = {
      field: "3",
      separator: ",",
      fileName: "cut.js"
    };
    assert.deepStrictEqual(parseCmdLineArgs(cmdLineArg), expected);
  });
});

describe("extractField", () => {
  it("should extract the separator when the separator is valid", () => {
    assert.deepStrictEqual(extractField(["-f", "3"]), { field: "3" });
  });
  it("should give the corresponding error message when -f is not present", () => {
    const expected = { error: `usage: cut -f list [-d delim] [file]` };
    assert.deepStrictEqual(extractField(["node"]), expected);
  });
  it("should give the corresponding error message when field value is zero", () => {
    const expected = { error: `cut: [-cf] list: values may not include zero` };
    assert.deepStrictEqual(extractField(["-f", "0"]), expected);
  });
  it("should give the corresponding error message when field value is not valid", () => {
    const expected = { error: `cut: [-cf] list: illegal list value` };
    assert.deepStrictEqual(extractField(["-f", "asd"]), expected);
  });
  it("should give the corresponding error message when no field is give after -f", () => {
    const expected = {
      error: `cut: option requires an argument -- f\nusage:cut -f list [-s] [-d delim] [file ...]`
    };
    assert.deepStrictEqual(extractField(["-f"]), expected);
  });
});

describe("extractSeparator", () => {
  it("should extract the separator when the separator is valid", () => {
    assert.deepStrictEqual(extractSeparator(["-d", ","], {}), {
      separator: ","
    });
  });
  it("should generate corresponding error message when no separator is specified after -d", () => {
    const expected = {
      error: `cut: option requires an argument -- d\nusage:cut -f list [-s] [-d delim] [file ...]`
    };
    assert.deepStrictEqual(extractSeparator(["-d"], {}), expected);
  });
});

describe("generateErrorMessage", () => {
  it("should give the msg corresponding to the input", () => {
    const expected = { error: `usage: cut -f list [-d delim] [file]` };
    assert.deepStrictEqual(generateErrorMessage("fieldMissing"), expected);
  });
});
