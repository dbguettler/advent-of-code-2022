import { getLines } from "../shared/utils";
import Monkey from "./monkey";
import BigMonkey from "./bigmonkey";

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
  const monkeys = monkeyLines.map((monk) => new BigMonkey(monk));
  const ROUNDS = 10000;

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

part1();
part2();
