import { getLines } from "../shared/utils";

function part1(): void {
  console.time("Runtime 1");
  const lines = getLines(process.argv);

  // Cycle number
  let cycle = 1;

  // Register X value
  let regX = 1;

  // Dummy Y register: holds null when not processing an addX.
  // Set to value to add in first cycle of addX, then added to X and unset
  // during second cycle of addX
  let regY: number | null = null;

  // Sum of signal strengths;
  let sumSigStrength = 0;
  for (let i = 0; i < lines.length; i++) {
    // Add to sum of signal strengths on certain cycles
    if ((cycle - 20) % 40 === 0) {
      sumSigStrength += cycle * regX;
    }
    // Get line
    const line = lines[i];
    if (regY !== null) {
      // Second cycle of addX
      regX += regY;
      regY = null;
    } else if (line.substring(0, 4) === "addx") {
      // First cycle of addX
      regY = parseInt(line.substring(5));
      i--;
    }
    // Always increment cycle
    cycle++;
  }
  console.timeEnd("Runtime 1");
  console.log(`${sumSigStrength}\n`); // Include extra line break to space out part 2's answer
}

function part2(): void {
  console.time("Runtime 2");
  const lines = getLines(process.argv);

  // Cycle number
  let cycle = 1;

  // Register X value
  let regX = 1;

  // Dummy Y register: holds null when not processing an addX.
  // Set to value to add in first cycle of addX, then added to X and unset
  // during second cycle of addX
  let regY: number | null = null;

  let pixels = new Array(240);
  let crtPos = 0;

  for (let i = 0; i < lines.length; i++) {
    // Draw pixel
    pixels[crtPos] = Math.abs((crtPos % 40) - regX) <= 1 ? "█" : " ";

    // Get line
    const line = lines[i];
    if (regY !== null) {
      // Second cycle of addX
      regX += regY;
      regY = null;
    } else if (line.substring(0, 4) === "addx") {
      // First cycle of addX
      regY = parseInt(line.substring(5));
      i--;
    }
    // Always increment cycle and crt position
    cycle++;
    crtPos++;
  }
  // Long print operation, so I'll include it in the runtime for this
  const pixelStr = pixels.join("");
  for (let i = 0; i < 6; i++) {
    console.log(pixelStr.substring(i * 40, (i + 1) * 40));
  }
  console.log(); // Include extra line break to space out part 2 answer
  console.timeEnd("Runtime 2");
}

part1();
part2();
