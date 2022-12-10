import { getLines } from "../shared/utils";
import Rope, { Direction } from "./rope";

/**
 * Instruction for rope movement: direction + number of spaces to move
 */
interface Instruction {
  direction: Direction;
  count: number;
}

function part1(): void {
  console.time("Runtime 1");

  // Read in lines, turn each into Instruction object
  const instructions: Instruction[] = getLines(process.argv).map((line) => {
    // Get direction from first character of line
    let direction: Direction;
    const char = line[0];
    switch (char) {
      case "U":
        direction = Direction.Up;
        break;
      case "D":
        direction = Direction.Down;
        break;
      case "L":
        direction = Direction.Left;
        break;
      case "R":
        direction = Direction.Right;
        break;
      default:
        console.error(`Invalid direction character ${char}`);
        process.exit(1);
    }

    // Get number from rest of line
    const count = parseInt(line.substring(line.indexOf(" ") + 1));

    // Return Instruction object
    return { direction, count };
  });

  // Create a new Rope with 2 knots
  const r = new Rope(2);
  for (const instr of instructions) {
    r.move(instr.direction, instr.count);
  }

  // Get number of visited spaces of tail
  const visited = r.getTailVisited();
  console.timeEnd("Runtime 1");

  // Log output
  console.log(visited);
}

function part2(): void {
  console.time("Runtime 2");

  // Read in lines, turn each into Instruction object
  const instructions: Instruction[] = getLines(process.argv).map((line) => {
    // Get direction from first character of line
    let direction: Direction;
    const char = line[0];
    switch (char) {
      case "U":
        direction = Direction.Up;
        break;
      case "D":
        direction = Direction.Down;
        break;
      case "L":
        direction = Direction.Left;
        break;
      case "R":
        direction = Direction.Right;
        break;
      default:
        console.error(`Invalid direction character ${char}`);
        process.exit(1);
    }

    // Get number from rest of line
    const count = parseInt(line.substring(line.indexOf(" ") + 1));

    // Return Instruction object
    return { direction, count };
  });

  // Create a new Rope with 2 knots
  const r = new Rope(10);
  for (const instr of instructions) {
    r.move(instr.direction, instr.count);
  }

  // Get number of visited spaces of tail
  const visited = r.getTailVisited();
  console.timeEnd("Runtime 2");

  // Log output
  console.log(visited);
}

part1();
part2();
