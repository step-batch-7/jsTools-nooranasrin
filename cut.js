const { handleCmdLineArgs } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { getFileName } = require("./src/cutLib");

const main = function(cmdLineArg) {
  const fileNames = getFileName(cmdLineArg);
  const fsTools = getFsTools();
  console.log(handleCmdLineArgs(cmdLineArg, fsTools, fileNames).join("\n"));
};

main(process.argv);
