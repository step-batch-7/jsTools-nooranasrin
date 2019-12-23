const { handleCmdLineArgs, chooseInputType } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { extractFileName } = require("./src/cmdLineArgHandler");

const main = function(cmdLineArg) {
  const fileNames = extractFileName(cmdLineArg);
  const fsTools = getFsTools();
  chooseInputType(process, cmdLineArg, fsTools, fileNames);
};

main(process.argv);
