const { executeCut } = require("./src/executeCommand");
const fs = require("fs");
const { stdout, stderr } = process;

const main = function(cmdLineArg) {
  const showError = error => stderr.write(`${error}\n`);
  const showFields = fields => stdout.write(`${fields}\n`);
  const print = { showError, showFields };
  const fsTools = { read: fs.readFile, encoding: "utf8" };
  executeCut(cmdLineArg, fsTools, print);
};

main(process.argv);
