const assert = require("chai").assert;
const cut = require("../src/cutLib");
const { getFieldContents, splitFields } = cut;

describe("getFieldContents", () => {
  it("should give an array of string that contains specified field value", () => {
    const field = 2;
    const line = "1,2";
    let actual = getFieldContents(field, ",", line);
    let expected = "2";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the line when the separator is not present", () => {
    const field = 2;
    const line = "12";
    let actual = getFieldContents(field, ",", line);
    let expected = "12";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("splitFields", () => {
  it("should give the line when the separator is not present", () => {
    const cutInfo = {
      field: 2,
      lines: ["1,2,3"],
      separator: ";"
    };
    const actual = splitFields(cutInfo);
    assert.deepStrictEqual(actual, ["1,2,3"]);
  });
  it("should give the field contents when the separator is present", () => {
    const cutInfo = {
      field: 2,
      lines: ["1,2,3"],
      separator: ","
    };
    const actual = splitFields(cutInfo);
    assert.deepStrictEqual(actual, ["2"]);
  });
});
