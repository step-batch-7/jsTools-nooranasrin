const assert = require("chai").assert;
const cut = require("../src/cutLib");
const {
  getSplittedFields,
  splitFields,
  extractFields,
  extractFileName,
  generateFieldList,
  extractSeparator
} = cut;

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

describe("extractFields", () => {
  it("should give an object containing the field value", () => {
    const cmdLineArg = ["node", "-f", "3"];
    assert.deepStrictEqual(extractFields({}, cmdLineArg), { fields: ["3"] });
  });
  it("should give an object containing field values when the fields contains two values", () => {
    const cmdLineArg = ["node", "-f", "3,5"];
    assert.deepStrictEqual(extractFields({}, cmdLineArg), {
      fields: ["3", "5"]
    });
  });
  it("should give an object containing all the field values when the given field is a range", () => {
    let cmdLineArg = ["node", "-f", "3-5"];
    assert.deepStrictEqual(extractFields({}, cmdLineArg), {
      fields: ["3", "4", "5"]
    });

    cmdLineArg = ["node", "-f", "3-7"];
    assert.deepStrictEqual(extractFields({}, cmdLineArg), {
      fields: ["3", "4", "5", "6", "7"]
    });
  });
});

describe("extractFileName", () => {
  it("should return the elements from 5th position when -d is not present", () => {
    const cmdLineArg = ["node", "cut.js", "-f", "4", "./numbers.txt"];
    assert.deepStrictEqual(extractFileName(cmdLineArg), ["./numbers.txt"]);
  });
  it("should return the element from 7th positions when -d is present", () => {
    const cmdLineArg = [
      "node",
      "cut.js",
      "-d",
      ",",
      "-f",
      "4",
      "./numbers.txt"
    ];
    assert.deepStrictEqual(extractFileName(cmdLineArg), ["./numbers.txt"]);
  });
});

describe("generateFieldList", () => {
  it("should generate a range of values in an array", () => {
    const expected = { fields: ["2", "3", "4", "5"] };
    const actual = generateFieldList({}, [2, 5]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("extractSeparator", () => {
  it("should give tab as default separator when separator is not present in command line arguments", () => {
    const expected = { separator: "	" };
    const actual = extractSeparator(["hello"], {});
    assert.deepStrictEqual(actual, expected);
  });
  it("should extract the given separator from the command line arguments when the separator is present", () => {
    const expected = { separator: "," };
    const actual = extractSeparator(["-d", ","], {});
    assert.deepStrictEqual(actual, expected);
  });
});
