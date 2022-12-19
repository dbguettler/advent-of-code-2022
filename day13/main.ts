import { getLines } from "../shared/utils";

function part1(): void {
  console.time("Runtime 1");
  const pairStrs = getLines(process.argv, "\n\n").map((pair) =>
    pair.split("\n")
  );
  let idx = 1;
  let sum = 0;
  for (const pair of pairStrs) {
    const first = JSON.parse(pair[0]);
    const second = JSON.parse(pair[1]);
    const comp = inOrder(first, second);
    if (comp === Comparison.ORDERED) sum += idx;
    idx++;
  }
  console.timeEnd("Runtime 1");
  console.log(sum);
}

function part2(): void {
  console.time("Runtime 2");
  const packets = getLines(process.argv, "\n\n")
    .map((pair) => pair.split("\n"))
    .flat()
    .map((pairStr) => JSON.parse(pairStr));
  packets.push([[2]], [[6]]);

  packets.sort(comparePackets);
  let decoderKey = 1;
  let idx = 1;
  for (const packet of packets) {
    if (
      packet.length === 1 &&
      packet[0].length === 1 &&
      (packet[0][0] === 2 || packet[0][0] === 6)
    ) {
      decoderKey *= idx;
    }
    idx++;
  }
  console.timeEnd("Runtime 2");
  console.log(decoderKey);
}

function comparePackets(packetA: any, packetB: any) {
  const comp = inOrder(packetA, packetB);
  if (comp === Comparison.ORDERED) return -1;
  if (comp === Comparison.NOT_ORDERED) return 1;
  return 0;
}

function inOrder(first: any, second: any): Comparison {
  //   console.log(`Compare ${JSON.stringify(first)} vs ${JSON.stringify(second)}`); // DEBUG Statement
  if (typeof first === "number" && typeof second === "number") {
    if (first < second) return Comparison.ORDERED;
    if (second < first) return Comparison.NOT_ORDERED;
    return Comparison.EQUAL;
  }

  if (typeof first !== "number" && typeof second !== "number") {
    let idx = 0;
    while (true) {
      const item1 = first[idx];
      const item2 = second[idx];
      if (item1 === undefined && item2 !== undefined) return Comparison.ORDERED;
      if (item2 === undefined && item1 !== undefined)
        return Comparison.NOT_ORDERED;
      if (item1 === undefined && item2 === undefined) return Comparison.EQUAL;
      const comp = inOrder(item1, item2);
      if (comp !== Comparison.EQUAL) return comp;
      idx++;
    }
  }

  // Unequal types
  if (typeof first === "number") {
    // Convert second to list
    const list = new Array(1);
    list[0] = first;
    return inOrder(list, second);
  } else {
    // typeof second === "number"
    // Convert second to list
    const list = new Array(1);
    list[0] = second;
    return inOrder(first, list);
  }
}

enum Comparison {
  ORDERED,
  EQUAL,
  NOT_ORDERED,
}

part1();
part2();
