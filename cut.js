const { executeCut } = require("./src/executeCommand");
const fs = require("fs");
const { stdout } = process;

const main = function(cmdLineArgs) {
  const onComplete = (error, content) => {
    stdout.write(content);
    console.error(error);
  };
  executeCut(cmdLineArgs, fs.readFile, onComplete);
};

main(process.argv);
