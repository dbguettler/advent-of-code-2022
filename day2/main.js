const utils = require("../shared/utils");

const startTime = Date.now();
const lines = utils.getLines(process.argv);

const SCORES = {
  A: {
    R: 1 + 3,
    P: 2 + 6,
    S: 3 + 0,
  },
  B: {
    R: 1 + 0,
    P: 2 + 3,
    S: 3 + 6,
  },
  C: {
    R: 1 + 6,
    P: 2 + 0,
    S: 3 + 3,
  },
};

const MOVES = {
  A: {
    X: "S",
    Y: "R",
    Z: "P",
  },
  B: {
    X: "R",
    Y: "P",
    Z: "S",
  },
  C: {
    X: "P",
    Y: "S",
    Z: "R",
  },
};

let total = 0;
for (const line of lines) {
  const opponent = line.at(0);
  const goal = line.at(2);
  const self = MOVES[opponent][goal];
  total += SCORES[opponent][self];
}

console.log(`Total score: ${total}`);

console.log(`\nCompleted in ${Date.now() - startTime} milliseconds.`);
