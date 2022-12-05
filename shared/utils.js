const fs = require("fs");

function getLines(argv, splitter = "\n") {
  const fname = argv[2] === "debug" ? "input-sm.txt" : "input-lg.txt";
  return fs.readFileSync(fname).toString().split(splitter);
}

module.exports = { getLines };
