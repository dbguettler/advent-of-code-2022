import { getLines } from "../shared/utils";

function part1() {
  console.time("Runtime 1");
  const [stacksInput, instrInput] = getLines(process.argv, "\n\n").map(
    (section) => section.split("\n")
  );
  const stacks = parseStacks(stacksInput);
  const instr = instrInput.map((ins) => parseInstr(ins));

  instr.forEach((ins) => executeMovePartOne(ins[0], ins[1], ins[2], stacks));

  const output = stacks.map((stack) => stack.at(-1)).join("");

  console.timeEnd("Runtime 1");
  console.log(output);
}

function part2() {
  console.time("Runtime 2");
  const [stacksInput, instrInput] = getLines(process.argv, "\n\n").map(
    (section) => section.split("\n")
  );
  const stacks = parseStacks(stacksInput);
  const instr = instrInput.map((ins) => parseInstr(ins));

  instr.forEach((ins) => executeMovePartTwo(ins[0], ins[1], ins[2], stacks));

  const output = stacks.map((stack) => stack.at(-1)).join("");
  console.timeEnd("Runtime 2");
  console.log(output);
}

function parseStacks(rows: string[]): string[][] {
  rows.reverse();
  let splitRows = rows.map((row) => splitStackLine(row));
  const colCount = splitRows[0].length;
  splitRows.shift();
  // Change from array of rows to array of columns
  splitRows = splitRows.reduce(
    (prevValue, currentItem) => {
      for (let i = 0; i < colCount; i++) {
        if (currentItem[i] !== " ") prevValue[i].push(currentItem[i]);
      }
      return prevValue;
    },
    Array.from(Array(colCount), () => new Array(0))
  );

  return splitRows;
}

function splitStackLine(line: string) {
  const cols = [];
  line = line.substring(1);
  for (let i = 0; i < line.length; i += 4) {
    cols.push(line.charAt(i));
  }

  return cols;
}

function parseInstr(instr: string) {
  return [...instr.matchAll(/[0-9]+/g)].map(
    (numArr, idx) => parseInt(numArr[0]) - (idx === 0 ? 0 : 1)
  );
}

function executeMovePartOne(
  count: number,
  from: number,
  to: number,
  stacks: string[][]
) {
  for (let i = 0; i < count; i++) {
    const item = stacks[from].pop();
    if (!item) throw new Error("Stack is empty");
    stacks[to].push(item);
  }
}

function executeMovePartTwo(
  count: number,
  from: number,
  to: number,
  stacks: string[][]
) {
  const popped = stacks[from].splice(stacks[from].length - count, count);
  stacks[to].push(...popped);
}

part1();
part2();