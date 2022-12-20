import { getLines, isDebug } from "../shared/utils";

/**
 * Change this value to set whether to show progress over all sensors or not.
 * Helpful for knowing how much longer it will take, but creates a lot of excess output.
 * On my input, part 1 took 2-3 seconds and part 2 took 4-7 seconds.
 */
const SHOW_PROGRESS = false;

function part1(): void {
  console.time("Runtime 1");
  // Array of Coordinate arrays. In each element, the first array element is the
  // sensor position, the second is the closest beacon position.
  const coords: Coordinate[][] = getLines(process.argv)
    .map((line) => line.match(/\-?[0-9]+/g)!.map((num) => parseInt(num)))
    .map((arr) => [
      { x: arr[0], y: arr[1] },
      { x: arr[2], y: arr[3] },
    ]);

  const targetY = isDebug(process.argv) ? 10 : 2000000;
  const noBeacons = new Map<number, boolean>();
  let sensorCount = 0;
  for (const [sensor, beacon] of coords) {
    if (sensor.y === targetY) noBeacons.set(sensor.x, false);
    if (beacon.y === targetY) noBeacons.set(beacon.x, false);
    const xCoords = xCoordsOfRow(sensor, beacon, targetY);
    for (const xCoord of xCoords) {
      if (noBeacons.get(xCoord) !== false) noBeacons.set(xCoord, true);
    }
    if (SHOW_PROGRESS) console.log(`Finished sensor ${++sensorCount}`);
  }
  let noBeaconCount = 0;
  for (const val of noBeacons.values()) {
    if (val === true) noBeaconCount++;
  }
  console.timeEnd("Runtime 1");
  console.log(noBeaconCount);
}

function part2(): void {
  console.time("Runtime 2");
  // Array of Coordinate arrays. In each element, the first array element is the
  // sensor position, the second is the closest beacon position.
  const coords: Coordinate[][] = getLines(process.argv)
    .map((line) => line.match(/\-?[0-9]+/g)!.map((num) => parseInt(num)))
    .map((arr) => [
      { x: arr[0], y: arr[1] },
      { x: arr[2], y: arr[3] },
    ]);

  const upperBound = isDebug(process.argv) ? 20 : 4000000;
  const noBeaconRows: number[][][] = new Array(upperBound + 1)
    .fill(0)
    .map((e) => []);
  let sensorCount = 0;
  for (const [sensor, beacon] of coords) {
    if (
      sensor.y >= 0 &&
      sensor.y <= upperBound &&
      sensor.x >= 0 &&
      sensor.x <= upperBound
    ) {
      addNoBeaconRange(noBeaconRows[sensor.y], sensor.x, sensor.x);
      collapse(noBeaconRows[sensor.y]);
    }
    if (
      beacon.y >= 0 &&
      beacon.y <= upperBound &&
      beacon.x >= 0 &&
      beacon.x <= upperBound
    ) {
      addNoBeaconRange(noBeaconRows[beacon.y], beacon.x, beacon.x);
      collapse(noBeaconRows[beacon.y]);
    }
    const yBounds = getYBounds(sensor, beacon, upperBound);
    for (let i = yBounds[0]; i <= yBounds[1]; i++) {
      const xCoords = xBoundsOfRow(sensor, beacon, i, upperBound);
      addNoBeaconRange(noBeaconRows[i], xCoords[0], xCoords[1]);
      collapse(noBeaconRows[i]);
    }
    if (SHOW_PROGRESS) console.log(`Finished sensor ${++sensorCount}`);
  }

  let tuningFreq = -1;
  for (let i = 0; i < noBeaconRows.length; i++) {
    if (noBeaconRows[i].length === 2) {
      const xVal = noBeaconRows[i][0][1] + 1;
      tuningFreq = xVal * 4000000 + i;
      break;
    }
  }
  console.log(tuningFreq);

  console.timeEnd("Runtime 2");
}

interface Coordinate {
  x: number;
  y: number;
}

function manhattanDistance(posA: Coordinate, posB: Coordinate): number {
  return Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
}

/**
 * Gets a list of the x-coordinates of the positions which cannot contain beacons in a given row.
 * @param sensor sensor position
 * @param beacon closest beacon position
 * @param rowY y value of row
 */
function xCoordsOfRow(
  sensor: Coordinate,
  beacon: Coordinate,
  rowY: number
): number[] {
  const distToBeacon = manhattanDistance(sensor, beacon);
  if (sensor.y + distToBeacon < rowY && sensor.y - distToBeacon > rowY)
    return [];
  const distToRow = Math.abs(sensor.y - rowY);
  const minX = sensor.x - (distToBeacon - distToRow);
  const maxX = sensor.x + (distToBeacon - distToRow);
  let xCoords = new Array<number>();
  for (let i = minX; i <= maxX; i++) {
    xCoords.push(i);
  }
  return xCoords;
}

function xBoundsOfRow(
  sensor: Coordinate,
  beacon: Coordinate,
  rowY: number,
  upperBound: number
) {
  const distToBeacon = manhattanDistance(sensor, beacon);
  const distToRow = Math.abs(sensor.y - rowY);
  const minX = sensor.x - (distToBeacon - distToRow);
  const maxX = sensor.x + (distToBeacon - distToRow);
  return [Math.max(minX, 0), Math.min(maxX, upperBound)];
}

function getYBounds(
  sensor: Coordinate,
  beacon: Coordinate,
  upperBound: number
): number[] {
  const distToBeacon = manhattanDistance(sensor, beacon);
  let min = Math.max(sensor.y - distToBeacon, 0);
  let max = Math.min(sensor.y + distToBeacon, upperBound);
  return [min, max];
}

function addNoBeaconRange(row: number[][], xMin: number, xMax: number) {
  for (let i = 0; i < row.length; i++) {
    if (xMax < row[i][0]) {
      // range falls before row[i], insert it now.
      row.splice(i, 0, [xMin, xMax]);
      return;
    } else if (row[i][0] <= xMin && row[i][1] >= xMin) {
      // range start falls within row[i]. Need to expand row[i] if range not fully contained.

      if (xMax <= row[i][1]) return;

      for (let j = 1; i + j < row.length; j++) {
        // Check if range end falls within row[i+j]
        if (xMax >= row[i + j][0] && xMax <= row[i + j][1]) {
          // Bridge gap between row[i] and row[i+j]
          row[i][1] = row[i + j][1];
          row.splice(i + 1, j);
          return;
        }

        // Check if range end comes before row[i+j]
        if (xMax < row[i + j][0]) {
          row[i][1] = xMax;
          row.splice(i + 1, j - 1);
          return;
        }
      }

      // Reached end of ranges. New range spans from row[i] to xMax.
      row[i][1] = xMax;
      row.splice(i + 1);
      return;
    } else if (row[i][0] <= xMax && row[i][1] >= xMax) {
      // range end falls within row[i]. Need to expand row[i].
      // If we're here, we know that the start does not overlap any row element.
      row[i][0] = xMin;
      return;
    } else {
      // range start/end did not fall inside row[i]. overlap check.
      if (xMin < row[i][0]) {
        row[i][0] = xMin;
        for (let j = 1; i + j < row.length; j++) {
          // Check if range end falls within row[i+j]
          if (xMax >= row[i + j][0] && xMax <= row[i + j][1]) {
            // Bridge gap between row[i] and row[i+j]
            row[i][1] = row[i + j][1];
            row.splice(i + 1, j);
            return;
          }

          // Check if range end comes before row[i+j]
          if (xMax < row[i + j][0]) {
            row[i][1] = xMax;
            row.splice(i + 1, j - 1);
            return;
          }
        }
        // Reached end of ranges. New range spans from before row[i] to xMax.
        row[i][1] = xMax;
        row.splice(i + 1);
        return;
      }
    }
  }

  // If we get here, the range should be inserted at the end.
  row.push([xMin, xMax]);
}

function collapse(row: number[][]) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i][1] + 1 === row[i + 1][0]) {
      row[i][1] = row[i + 1][1];
      row.splice(i + 1, 1);
    }
  }
}

part1();
part2();
