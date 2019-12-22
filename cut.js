const { handleCmdLineArg } = require("./src/executeCommand");

const main = function(cmdLineArg) {
  console.log(handleCmdLineArg(cmdLineArg).join("\n"));
};

main(process.argv);
