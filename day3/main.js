const utils = require("../shared/utils");

/**
 * Part 1 Implementation
 */
function part1() {
  console.time("Runtime 1");
  const lines = utils.getLines(process.argv);

  let total = 0;
  for (const line of lines) {
    const s = new Set();
    for (let i = 0; i < line.length / 2; i++) {
      s.add(line.charAt(i));
    }
    for (let i = line.length / 2; i < line.length; i++) {
      if (s.has(line.charAt(i))) {
        const code = line.charCodeAt(i);
        total += code >= 97 ? code - 97 + 1 : code - 65 + 27;
        break;
      }
    }
  }

  console.timeEnd("Runtime 1");
  console.log(`Part 1: ${total}`);
}

/**
 * Part 2 implementation
 */
function part2() {
  console.time("Runtime 2");
  const lines = utils.getLines(process.argv);

  let total = 0;
  for (let i = 0; i < lines.length; i += 3) {
    let a = lines[i];
    let b = lines[i + 1];
    let c = lines[i + 2];
    let sa = new Set();
    let sb = new Set();

    for (let j = 0; j < a.length; j++) {
      sa.add(a.charAt(j));
    }
    for (let j = 0; j < b.length; j++) {
      sb.add(b.charAt(j));
    }
    for (let j = 0; j < c.length; j++) {
      const char = c.charAt(j);
      if (sa.has(char) && sb.has(char)) {
        const code = c.charCodeAt(j);
        total += code >= 97 ? code - 97 + 1 : code - 65 + 27;
        break;
      }
    }
  }

  console.timeEnd("Runtime 2");
  console.log(`Part 2: ${total}`);
}

/**
 * Run both parts
 */
part1();
part2();
