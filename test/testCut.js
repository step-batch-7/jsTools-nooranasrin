const assert = require("chai").assert;
const cut = require("../src/cutLib");
const { splitFields } = cut;

describe("splitFields", () => {
  it("should give the line when the separator is not present", () => {
    const cutInfo = {
      field: 2,
      separator: ";"
    };
    const contents = "1,2,3";
    const actual = splitFields(cutInfo, contents);
    assert.deepStrictEqual(actual, ["1,2,3"]);
  });
  it("should give the field contents when the separator is present", () => {
    const cutInfo = {
      field: 2,
      separator: ","
    };
    const contents = "1,2,3";
    const actual = splitFields(cutInfo, contents);
    assert.deepStrictEqual(actual, ["2"]);
  });
});
