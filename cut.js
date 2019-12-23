const { handleCmdLineArg } = require("./src/executeCommand");
const { getFsTools } = require("./src/fsOperationsLib");
const { getFileName } = require("./src/cutLib");

const main = function(cmdLineArg) {
  const fileName = getFileName(cmdLineArg);
  const fsTools = getFsTools(fileName);
  console.log(handleCmdLineArg(cmdLineArg, fsTools).join("\n"));
};

main(process.argv);
