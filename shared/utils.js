const fs = require("fs");

function getLines(argv) {
  const fname = argv[2] === "debug" ? "input-sm.txt" : "input-lg.txt";
  return fs.readFileSync(fname).toString().split("\n");
}

module.exports = { getLines };
