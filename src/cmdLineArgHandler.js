const parseCmdLineArgs = function(cmdLineArgs) {
  const field = cmdLineArgs[cmdLineArgs.indexOf("-f") + 1];
  const fileName = cmdLineArgs[cmdLineArgs.length - 1];
  return { field, fileName };
};

module.exports = { parseCmdLineArgs };
