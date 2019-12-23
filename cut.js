const { handleCmdLineArgs } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { getFileName } = require("./src/cutLib");
const { stdin, stdout } = process;

const main = function(cmdLineArg) {
  const fileNames = getFileName(cmdLineArg);
  const fsTools = getFsTools();
  stdout.write(handleCmdLineArgs(cmdLineArg, fsTools, fileNames).join("\n"));
};

main(process.argv);
