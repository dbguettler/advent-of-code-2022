const utils = require("../shared/utils");

function part1() {
  console.time("Runtime 1");
  // Split input lines into pairs, then split pairs into ranges,
  // then split ranges into endpoints (and turn those into numbers)
  const pairs = utils
    .getLines(process.argv)
    .map((line) =>
      line
        .split(",")
        .map((range) => range.split("-").map((num) => parseInt(num)))
    );
  let contain = 0;

  for (const pair of pairs) {
    // If one set of ranges is completely inside another
    if (
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1])
    ) {
      contain++;
    }
  }

  console.timeEnd("Runtime 1");
  console.log(contain);
}

function part2() {
  console.time("Runtime 2");
  // Split input lines into pairs, then split pairs into ranges,
  // then split ranges into endpoints (and turn those into numbers)
  const pairs = utils
    .getLines(process.argv)
    .map((line) =>
      line
        .split(",")
        .map((range) => range.split("-").map((num) => parseInt(num)))
    );
  let overlap = 0;

  for (const pair of pairs) {
    // If one set of ranges contains another, or the endpoint of one range is inside another
    if (
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
      (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1])
    ) {
      overlap++;
    }
  }

  console.timeEnd("Runtime 2");
  console.log(overlap);
}

part1();
part2();
