import { getLines } from "../shared/utils";

function part1(): void {
  console.time("Runtime 1");
  const shapesArr = getLines(process.argv).map((line) =>
    line
      .match(/[0-9]+,[0-9]+/g)!
      .map((coord) => coord.split(",").map((element) => parseInt(element)))
  );
  const shapes: Coordinate[][] = shapesArr.map((shape) =>
    shape.map((coord) => ({ x: coord[0], y: coord[1] }))
  );

  // Get greatest (lowest vertical y) coord of shapes
  let abyss = 0;
  for (const shape of shapes) {
    for (const coord of shape) {
      if (coord.y > abyss) abyss = coord.y;
    }
  }

  const grid = new Map<string, GridPoint>();
  for (const shape of shapes) {
    for (let i = 0; i < shape.length - 1; i++) {
      grid.set(getKey(shape[i]), GridPoint.ROCK);
      if (shape[i].x === shape[i + 1].x) {
        // X coords equal
        const incOrDec = shape[i].y > shape[i + 1].y ? -1 : 1;
        let y = shape[i].y + incOrDec;
        while (y !== shape[i + 1].y) {
          grid.set(getKey({ x: shape[i].x, y: y }), GridPoint.ROCK);
          y += incOrDec;
        }
      } else {
        // Y coords equal
        const incOrDec = shape[i].x > shape[i + 1].x ? -1 : 1;
        let x = shape[i].x + incOrDec;
        while (x !== shape[i + 1].x) {
          grid.set(getKey({ x: x, y: shape[i].y }), GridPoint.ROCK);
          x += incOrDec;
        }
      }
      grid.set(getKey(shape[i + 1]), GridPoint.ROCK);
    }
  }

  let numGrains = 0;
  done: while (true) {
    let sandCoord = getNewSandCoordinate();
    while (true) {
      if (
        grid.get(getKey({ x: sandCoord.x, y: sandCoord.y + 1 })) === undefined
      ) {
        // Move straight down
        sandCoord.y += 1;
      } else if (
        grid.get(getKey({ x: sandCoord.x - 1, y: sandCoord.y + 1 })) ===
        undefined
      ) {
        // Move down and left
        sandCoord.x -= 1;
        sandCoord.y += 1;
      } else if (
        grid.get(getKey({ x: sandCoord.x + 1, y: sandCoord.y + 1 })) ===
        undefined
      ) {
        // Move down and right
        sandCoord.x += 1;
        sandCoord.y += 1;
      } else {
        // Rest
        grid.set(getKey(sandCoord), GridPoint.SAND);
        numGrains++;
        break;
      }

      if (sandCoord.y >= abyss) {
        break done;
      }
    }
  }

  console.timeEnd("Runtime 1");
  console.log(numGrains);
}

function part2(): void {
  console.time("Runtime 2");
  const shapesArr = getLines(process.argv).map((line) =>
    line
      .match(/[0-9]+,[0-9]+/g)!
      .map((coord) => coord.split(",").map((element) => parseInt(element)))
  );
  const shapes: Coordinate[][] = shapesArr.map((shape) =>
    shape.map((coord) => ({ x: coord[0], y: coord[1] }))
  );

  // Get greatest (lowest vertical y) coord of shapes
  let abyss = 0;
  for (const shape of shapes) {
    for (const coord of shape) {
      if (coord.y > abyss) abyss = coord.y;
    }
  }
  abyss += 2;

  const grid = new Map<string, GridPoint>();
  for (const shape of shapes) {
    for (let i = 0; i < shape.length - 1; i++) {
      grid.set(getKey(shape[i]), GridPoint.ROCK);
      if (shape[i].x === shape[i + 1].x) {
        // X coords equal
        const incOrDec = shape[i].y > shape[i + 1].y ? -1 : 1;
        let y = shape[i].y + incOrDec;
        while (y !== shape[i + 1].y) {
          grid.set(getKey({ x: shape[i].x, y: y }), GridPoint.ROCK);
          y += incOrDec;
        }
      } else {
        // Y coords equal
        const incOrDec = shape[i].x > shape[i + 1].x ? -1 : 1;
        let x = shape[i].x + incOrDec;
        while (x !== shape[i + 1].x) {
          grid.set(getKey({ x: x, y: shape[i].y }), GridPoint.ROCK);
          x += incOrDec;
        }
      }
      grid.set(getKey(shape[i + 1]), GridPoint.ROCK);
    }
  }

  let numGrains = 0;
  done: while (true) {
    let sandCoord = getNewSandCoordinate();
    while (true) {
      if (sandCoord.y + 1 === abyss) {
        // Rest
        grid.set(getKey(sandCoord), GridPoint.SAND);
        numGrains++;
        break;
      } else if (
        grid.get(getKey({ x: sandCoord.x, y: sandCoord.y + 1 })) === undefined
      ) {
        // Move straight down
        sandCoord.y += 1;
      } else if (
        grid.get(getKey({ x: sandCoord.x - 1, y: sandCoord.y + 1 })) ===
        undefined
      ) {
        // Move down and left
        sandCoord.x -= 1;
        sandCoord.y += 1;
      } else if (
        grid.get(getKey({ x: sandCoord.x + 1, y: sandCoord.y + 1 })) ===
        undefined
      ) {
        // Move down and right
        sandCoord.x += 1;
        sandCoord.y += 1;
      } else {
        // Rest
        grid.set(getKey(sandCoord), GridPoint.SAND);
        numGrains++;
        if (sandCoord.x === 500 && sandCoord.y === 0) break done;
        break;
      }

      if (sandCoord.y >= abyss) {
        break done;
      }
    }
  }

  console.timeEnd("Runtime 2");
  console.log(numGrains);
}

interface Coordinate {
  x: number;
  y: number;
}

enum GridPoint {
  ROCK,
  SAND,
}

function getKey(coord: Coordinate): string {
  return `${coord.x},${coord.y}`;
}

function getNewSandCoordinate(): Coordinate {
  return { x: 500, y: 0 };
}

part1();
part2();
