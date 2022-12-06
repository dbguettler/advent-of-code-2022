import { getLines } from "../shared/utils";

const startTime = Date.now();
const lines = getLines(process.argv);

interface ScoreOuter {
  [key: string]: ScoreInner;
}

interface ScoreInner {
  [key: string]: number;
}

// Maps SCORES[outer][inner] to a score, where outer is the opponent's move and inner is your move
const SCORES: ScoreOuter = {
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

interface MoveOuter {
  [key: string]: MoveInner;
}

interface MoveInner {
  [key: string]: string;
}

// Maps MOVES[outer][inner] to your move letter, where outer is the opponent's move and inner is the desired game outcome
const MOVES: MoveOuter = {
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
  const opponent = line[0];
  const sym = line[2];
  one += SCORES[opponent][sym];
  const self = MOVES[opponent][sym];
  two += SCORES[opponent][self];
}

console.log(`Part One: ${one}`);
console.log(`Part Two: ${two}`);

console.log(`\nCompleted in ${Date.now() - startTime} milliseconds.`);
