const { executeCut } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { parseCmdLineArgs } = require("./src/cmdLineArgHandler");
const { stdout } = process;

const main = function(cmdLineArg) {
  const cutInfo = parseCmdLineArgs(cmdLineArg);
  const fsTools = getFsTools();
  const extractedFields = executeCut(cutInfo, fsTools);
  extractedFields.error && console.error(extractedFields.error);
  extractedFields.msg && stdout.write(extractedFields.msg.join("\n"));
};

main(process.argv);
