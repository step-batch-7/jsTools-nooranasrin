const { executeCut } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { stdout, stderr } = process;

const main = function(cmdLineArg) {
  const fsTools = getFsTools();
  const extractedFields = executeCut(cmdLineArg, fsTools);
  stdout.write(extractedFields.msg);
  stderr.write(`${extractedFields.error}\n`);
};

main(process.argv);
