const assert = require("chai").assert;
const cut = require("../src/cutLib");
const { getSplittedFields, splitFields } = cut;

describe("cutFields", () => {
  it("should give an array of string that contains specified field values", () => {
    let cutInfo = {
      fields: [2],
      separator: "  ",
      lines: ["123  123", "123  124"]
    };
    let actual = getSplittedFields(cutInfo);
    let expected = [["123"], ["124"]];
    assert.deepStrictEqual(actual, expected);

    cutInfo = {
      fields: [2],
      separator: "  ",
      lines: ["123  123  123", "123  124  123"]
    };
    actual = getSplittedFields(cutInfo);
    expected = [["123"], ["124"]];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the line when the separator is not present", () => {
    const cutInfo = {
      fields: [2],
      separator: "  ",
      lines: ["123", "123"]
    };
    const actual = getSplittedFields(cutInfo);
    const expected = [["123"], ["123"]];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("splitFields", () => {
  it("should give the line when the separator is not present", () => {
    const field = [2];
    const fieldContents = [];
    const line = "123 123";
    const actual = splitFields(field, "  ", line);
    assert.deepStrictEqual(actual, ["123 123"]);
  });
  it("should give the field contents when the separator is present", () => {
    const field = [2];
    const fieldContents = [];
    const line = "123  124";
    const actual = splitFields(field, "  ", line);
    assert.deepStrictEqual(actual, ["124"]);
  });
  it("should give the fields contents when more than one field is needed", () => {
    const field = [2, 3, 5];
    const fieldContents = [];
    const line = "123  124  123  124  126";
    const actual = splitFields(field, "  ", line);
    assert.deepStrictEqual(actual, ["124", "123", "126"]);
  });
});
