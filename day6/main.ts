import { getLines } from "../shared/utils";
import Queue from "../shared/queue";

function part1(): void {
  console.time("Runtime 1");
  const line: string[] = getLines(process.argv)[0].split("");
  const q: Queue<string> = new Queue<string>();

  // Error checking
  if (line.length < 4) {
    console.error("Line must be at least 4 characters long.");
    process.exit(1);
  }

  // Enqueue first three elements
  q.enqueue(...line.slice(0, 3));
  let packetIndex = -1;

  for (let i = 3; i < line.length; i++) {
    if (!q.contains(line[i]) && !q.hasDuplicates()) {
      packetIndex = i + 1;
      break;
    } else {
      q.enqueue(line[i]);
      q.dequeue();
    }
  }

  console.timeEnd("Runtime 1");
  if (packetIndex !== -1) {
    console.log(`Start of packet marker: ${packetIndex}`);
  } else {
    console.log("No start of packet marker found.");
  }
}

function part2(): void {
  console.time("Runtime 2");
  const line: string[] = getLines(process.argv)[0].split("");
  const q: Queue<string> = new Queue<string>();

  // Error checking
  if (line.length < 14) {
    console.error("Line must be at least 14 characters long.");
    process.exit(1);
  }

  // Enqueue first thirteen elements
  q.enqueue(...line.slice(0, 13));
  let messageIndex = -1;

  for (let i = 13; i < line.length; i++) {
    if (!q.contains(line[i]) && !q.hasDuplicates()) {
      messageIndex = i + 1;
      break;
    } else {
      q.enqueue(line[i]);
      q.dequeue();
    }
  }
  console.timeEnd("Runtime 2");

  if (messageIndex !== -1) {
    console.log(`Start of message marker: ${messageIndex}`);
  } else {
    console.log("No start of message marker found.");
  }
}

part1();
part2();
