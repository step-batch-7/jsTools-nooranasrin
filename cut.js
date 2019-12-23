const { handleCmdLineArgs, chooseInputType } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { getFileName } = require("./src/cutLib");

const main = function(cmdLineArg) {
  const fileNames = getFileName(cmdLineArg);
  const fsTools = getFsTools();
  chooseInputType(process, cmdLineArg, fsTools, fileNames);
};

main(process.argv);
