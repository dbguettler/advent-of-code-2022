import { getLines } from "../shared/utils";
import Monkey from "./monkey";

function part1(): void {
  console.time("Runtime 1");
  const monkeyLines = getLines(process.argv, "\n\n");
  const monkeys = monkeyLines.map((monk) => new Monkey(monk));
  const ROUNDS = 20;

  // Complete 20 rounds.
  for (let round = 0; round < ROUNDS; round++) {
    for (const monkey of monkeys) {
      const thrown = monkey.throwAll();
      for (const item of thrown) {
        monkeys[item.monkeyNumber].catchItem(item.item);
      }
    }
  }

  // No chance of getting monkey by number after this sort :(
  // However that doesn't matter, we just want to multiply the two highest inspection counts.
  // This sorts in descending order.
  monkeys.sort((a, b) => b.getInspectionCount() - a.getInspectionCount());
  const monkeyBusiness =
    monkeys[0].getInspectionCount() * monkeys[1].getInspectionCount();

  console.timeEnd("Runtime 1");
  console.log(monkeyBusiness);
}

function part2(): void {
  console.time("Runtime 2");
  const monkeyLines = getLines(process.argv, "\n\n");
  const monkeys = monkeyLines.map((monk) => new Monkey(monk, true));
  const ROUNDS = 10000;

  const testvalues = monkeys.map((monkey) => monkey.getTest());
  console.time("Calculate LCM");
  const lcm = getLCM(...testvalues);
  console.timeEnd("Calculate LCM");
  monkeys.forEach((monkey) => monkey.setBigMod(lcm));

  // Complete 10000 rounds.
  for (let round = 0; round < ROUNDS; round++) {
    for (const monkey of monkeys) {
      const thrown = monkey.throwAll();
      for (const item of thrown) {
        monkeys[item.monkeyNumber].catchItem(item.item);
      }
    }
  }

  // No chance of getting monkey by number after this sort :(
  // However that doesn't matter, we just want to multiply the two highest inspection counts.
  // This sorts in descending order.
  monkeys.sort((a, b) => b.getInspectionCount() - a.getInspectionCount());
  const monkeyBusiness =
    monkeys[0].getInspectionCount() * monkeys[1].getInspectionCount();

  console.timeEnd("Runtime 2");
  console.log(monkeyBusiness);
}

// Somewhat slow but functional way to get LCM of a set of numbers.
function getLCM(...nums: number[]): number {
  if (!nums.length) throw new Error("No values provided");
  const iNums = nums.map((num) => ({ og: num, inc: num }));
  while (!iNums.every((entry) => entry.inc === iNums[0].inc)) {
    iNums.sort((a, b) => a.inc - b.inc);
    iNums[0].inc += iNums[0].og;
  }
  return iNums[0].inc;
}

part1();
part2();
