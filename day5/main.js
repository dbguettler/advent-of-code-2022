const rf = require("fs").readFileSync;

function part1() {
  console.time("Runtime 1");
  const [stacksInput, instrInput] = rf(
    `input-${process.argv[2] === "debug" ? "sm" : "lg"}.txt`
  )
    .toString()
    .split("\n\n")
    .map((section) => section.split("\n"));
  const stacks = parseStacks(stacksInput);
  const instr = instrInput.map((ins) => parseInstr(ins));

  instr.forEach((ins) => executeMovePartOne(...ins, stacks));

  const output = stacks.map((stack) => stack.at(-1)).join("");

  console.timeEnd("Runtime 1");
  console.log(output);
}

function part2() {
  console.time("Runtime 2");
  const [stacksInput, instrInput] = rf(
    `input-${process.argv[2] === "debug" ? "sm" : "lg"}.txt`
  )
    .toString()
    .split("\n\n")
    .map((section) => section.split("\n"));
  const stacks = parseStacks(stacksInput);
  const instr = instrInput.map((ins) => parseInstr(ins));

  instr.forEach((ins) => executeMovePartTwo(...ins, stacks));

  const output = stacks.map((stack) => stack.at(-1)).join("");
  console.timeEnd("Runtime 2");
  console.log(output);
}

function parseStacks(rows) {
  rows.reverse();
  rows = rows.map((row) => splitStackLine(row));
  const colCount = rows.shift().length;
  rows = rows.reduce(
    (prevValue, currentItem) => {
      for (let i = 0; i < colCount; i++) {
        if (currentItem[i] !== " ") prevValue[i].push(currentItem[i]);
      }
      return prevValue;
    },
    Array.from(Array(colCount), () => new Array(0))
  );

  return rows;
}

function splitStackLine(line) {
  const cols = [];
  line = line.substring(1);
  for (let i = 0; i < line.length; i += 4) {
    cols.push(line.charAt(i));
  }

  return cols;
}

function parseInstr(instr) {
  return [...instr.matchAll(/[0-9]+/g)].map(
    (numArr, idx) => parseInt(numArr.at(0)) - (idx === 0 ? 0 : 1)
  );
}

function executeMovePartOne(count, from, to, stacks) {
  for (let i = 0; i < count; i++) {
    stacks[to].push(stacks[from].pop());
  }
}

function executeMovePartTwo(count, from, to, stacks) {
  const popped = stacks[from].splice(stacks[from].length - count, count);
  stacks[to].push(...popped);
}

part1();
part2();
