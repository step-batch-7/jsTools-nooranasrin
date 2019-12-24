const { executeCut } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { stdout } = process;

const main = function(cmdLineArg) {
  const fsTools = getFsTools();
  const extractedFields = executeCut(cmdLineArg, fsTools);
  extractedFields.error && console.error(extractedFields.error);
  extractedFields.msg && stdout.write(extractedFields.msg.join("\n"));
};

main(process.argv);
