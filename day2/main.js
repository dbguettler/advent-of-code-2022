const utils = require("../shared/utils");

const startTime = Date.now();
const lines = utils.getLines(process.argv);

const SCORES = {
  A: {
    X: 1 + 3,
    Y: 2 + 6,
    Z: 3 + 0,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + 3,
  },
};

const MOVES = {
  A: {
    X: "Z",
    Y: "X",
    Z: "Y",
  },
  B: {
    X: "X",
    Y: "Y",
    Z: "Z",
  },
  C: {
    X: "Y",
    Y: "Z",
    Z: "X",
  },
};

let two = 0;
let one = 0;
for (const line of lines) {
  const opponent = line.at(0);
  const sym = line.at(2);
  one += SCORES[opponent][sym];
  const self = MOVES[opponent][sym];
  two += SCORES[opponent][self];
}

console.log(`Part One: ${one}`);
console.log(`Part Two: ${two}`);

console.log(`\nCompleted in ${Date.now() - startTime} milliseconds.`);
