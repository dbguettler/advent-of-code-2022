import { getLines } from "../shared/utils";

function part1(): void {
  console.time("Runtime 1");
  const grid: number[][] = getLines(process.argv).map((line) =>
    line.split("").map((numStr) => parseInt(numStr))
  );
  const fromTop = duplicateGrid(grid);
  const fromLeft = duplicateGrid(grid);
  const fromBottom = duplicateGrid(grid);
  const fromRight = duplicateGrid(grid);

  // Generate tallest from top
  for (let i = 0; i < fromTop.length; i++) {
    for (let j = 0; j < fromTop[i].length; j++) {
      if (i === 0) {
        fromTop[i][j] = -1;
      } else {
        fromTop[i][j] = Math.max(fromTop[i - 1][j], grid[i - 1][j]);
      }
    }
  }

  // Generate tallest from bottom
  for (let i = fromBottom.length - 1; i >= 0; i--) {
    for (let j = fromBottom[i].length - 1; j >= 0; j--) {
      if (i === fromBottom.length - 1) {
        fromBottom[i][j] = -1;
      } else {
        fromBottom[i][j] = Math.max(fromBottom[i + 1][j], grid[i + 1][j]);
      }
    }
  }

  // Generate tallest from right
  for (let i = 0; i < fromRight.length; i++) {
    for (let j = fromRight[i].length - 1; j >= 0; j--) {
      if (j === fromRight.length - 1) {
        fromRight[i][j] = -1;
      } else {
        fromRight[i][j] = Math.max(fromRight[i][j + 1], grid[i][j + 1]);
      }
    }
  }

  // Generate tallest from left
  for (let i = 0; i < fromLeft.length; i++) {
    for (let j = 0; j < fromLeft[i].length; j++) {
      if (j === 0) {
        fromLeft[i][j] = -1;
      } else {
        fromLeft[i][j] = Math.max(fromLeft[i][j - 1], grid[i][j - 1]);
      }
    }
  }

  let visible = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        Math.min(
          fromBottom[i][j],
          fromTop[i][j],
          fromLeft[i][j],
          fromRight[i][j]
        ) < grid[i][j]
      ) {
        visible++;
      }
    }
  }

  console.timeEnd("Runtime 1");
  console.log(visible);
}

function part2(): void {
  console.time("Runtime 2");
  const grid: number[][] = getLines(process.argv).map((line) =>
    line.split("").map((numStr) => parseInt(numStr))
  );

  let scenicScore = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      scenicScore = Math.max(scenicScore, getScenicScore(i, j, grid));
    }
  }
  console.timeEnd("Runtime 2");
  console.log(scenicScore);
}

function getScenicScore(i: number, j: number, grid: number[][]): number {
  let downScore = 0;
  for (let k = i + 1; k < grid.length; k++) {
    downScore++;
    if (grid[k][j] >= grid[i][j]) {
      break;
    }
  }

  let upScore = 0;
  for (let k = i - 1; k >= 0; k--) {
    upScore++;
    if (grid[k][j] >= grid[i][j]) {
      break;
    }
  }

  let rightScore = 0;
  for (let k = j + 1; k < grid[i].length; k++) {
    rightScore++;
    if (grid[i][k] >= grid[i][j]) {
      break;
    }
  }

  let leftScore = 0;
  for (let k = j - 1; k >= 0; k--) {
    leftScore++;
    if (grid[i][k] >= grid[i][j]) {
      break;
    }
  }

  return downScore * upScore * leftScore * rightScore;
}

function duplicateGrid(grid: number[][]): number[][] {
  return grid.map((row) => row.map((entry) => entry));
}

part1();
part2();
