const utils = require("../shared/utils");

const startTime = Date.now();
const lines = utils.getLines(process.argv);

let max = [0, 0, 0];
let sum = 0;

for (let i = 0; i <= lines.length; i++) {
  if (lines[i] === "" || i === lines.length) {
    if (sum > max[2]) {
      max[0] = max[1];
      max[1] = max[2];
      max[2] = sum;
    } else if (sum > max[1]) {
      max[0] = max[1];
      max[1] = sum;
    } else if (sum > max[0]) {
      max[0] = sum;
    }
    sum = 0;
  } else {
    sum += parseInt(lines[i]);
  }
}

console.log(`Part One: ${max[2]} calories`);
console.log(`Part Two: ${max[0] + max[1] + max[2]} calories`);

console.log(`\nCompleted in ${Date.now() - startTime} milliseconds.`);
