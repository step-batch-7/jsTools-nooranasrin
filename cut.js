const { handleCmdLineArg } = require("./src/executeCommand");

const main = function(cmdLineArg, env) {
  console.log(handleCmdLineArg(cmdLineArg, env).join("\n"));
};

main(process.argv, process.env);
