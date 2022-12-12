import { getLines } from "../shared/utils";

function part1(): void {
  console.time("Runtime 1");
  let gridStrs = getLines(process.argv).map((rowStr) => rowStr.split(""));
  const y_dim = gridStrs.length;
  const x_dim = gridStrs[0].length;
  let st: Coordinate = { x: -1, y: -1 };
  let end: Coordinate = { x: -1, y: -1 };

  const grid: PQNode[][] = new Array(gridStrs.length);

  for (let y = 0; y < y_dim; y++) {
    grid[y] = new Array(gridStrs[y].length);
    for (let x = 0; x < x_dim; x++) {
      grid[y][x] = makePQNode(x, y, 0, gridStrs[y][x]);

      if (gridStrs[y][x] === "S") st = { x, y };
      if (gridStrs[y][x] === "E") end = { x, y };
    }
  }

  // Run single A* algorithm from start to end
  const steps = aStar(grid, st, end);
  console.timeEnd("Runtime 1");
  console.log(steps);
}

function part2() {
  console.time("Runtime 2");
  let gridStrs = getLines(process.argv).map((rowStr) => rowStr.split(""));
  const y_dim = gridStrs.length;
  const x_dim = gridStrs[0].length;

  // Possible start positions
  let starts: Coordinate[] = new Array();
  let end: Coordinate = { x: -1, y: -1 };

  const grid: PQNode[][] = new Array(gridStrs.length);

  for (let y = 0; y < y_dim; y++) {
    grid[y] = new Array(gridStrs[y].length);
    for (let x = 0; x < x_dim; x++) {
      grid[y][x] = makePQNode(x, y, 0, gridStrs[y][x]);
      if (gridStrs[y][x] === "E") end = { x, y };
      if (gridStrs[y][x] === "a" || gridStrs[y][x] === "S")
        starts.push({ x, y });
    }
  }

  // Run A* for every possible start position
  const steps: (number | null)[] = starts.map((coord) =>
    aStar(grid, coord, end)
  );

  // Sort steps based on least number of steps. All nulls come last.
  steps.sort((a, b) => {
    if (a === null) return 1;
    if (b === null) return -1;
    return a - b;
  });

  console.timeEnd("Runtime 2");
  console.log(steps[0]);
}

/**
 * Basic A* implementation for a grid with equal edge costs. Heuristic is Manhattan distance.
 * @param grid grid of PQNodes
 * @param st start coordinates
 * @param end end coordinates
 * @returns cost of shortest path, or null if no path found
 */
function aStar(
  grid: PQNode[][],
  st: Coordinate,
  end: Coordinate
): number | null {
  const y_dim = grid.length;
  const x_dim = grid[0].length;
  let discovered: PQNode[] = new Array(1);

  const start = grid[st.y][st.x];
  const goal = grid[end.y][end.x];

  discovered[0] = start;
  discovered.sort(pqSorter);
  const cameFrom = new Map<string, string | null>();
  const costSoFar = new Map<string, number>();
  cameFrom.set(start.str_id, null);
  costSoFar.set(start.str_id, 0);

  while (discovered.length) {
    let current = discovered.shift();
    if (nodesEqual(current!, goal)) break;

    for (let next of getNeighbors(grid, current!, y_dim, x_dim)) {
      let newCost = costSoFar.get(current!.str_id)! + next.cost;
      if (
        costSoFar.get(next.str_id) === undefined ||
        newCost < costSoFar.get(next.str_id)!
      ) {
        costSoFar.set(next.str_id, newCost);
        next.priority = newCost + getMDist(next, goal);
        discovered = discovered.filter((elem) => elem.str_id !== next.str_id);
        discovered.push(next);
        discovered.sort(pqSorter);
        cameFrom.set(next.str_id, current!.str_id);
      }
    }
  }
  return costSoFar.get(goal.str_id) ?? null;
}

/**
 * Creates a graph/priorityqueue node
 * @param x x coordinate
 * @param y y coordinate
 * @param priority priority of node in queue
 * @param height height of node on graph
 * @returns new PQNode object
 */
function makePQNode(
  x: number,
  y: number,
  priority: number,
  height: string
): PQNode {
  let h = height.charCodeAt(0);
  if (height === "S") h = "a".charCodeAt(0);
  if (height === "E") h = "z".charCodeAt(0);
  return {
    x: x,
    y: y,
    priority: priority,
    str_id: `${x},${y}`,
    cost: 1,
    height: h,
  };
}

function pqSorter(a: PQNode, b: PQNode): number {
  return a.priority - b.priority;
}

function nodesEqual(a: PQNode, b: PQNode) {
  return a.str_id === b.str_id;
}

/**
 * Gets all possible neighbors of grid space
 * @param grid grid of all positions
 * @param node the specific node/grid position to check neighbors of
 * @param y_dim columns of grid for simplification
 * @param x_dim rows of grid for simplification
 * @returns
 */
function getNeighbors(
  grid: PQNode[][],
  node: PQNode,
  y_dim: number,
  x_dim: number
): PQNode[] {
  const neighbors = [];
  if (node.x > 0) {
    const n = grid[node.y][node.x - 1];
    if (node.height - n.height >= -1) neighbors.push(n);
  }
  if (node.y > 0) {
    const n = grid[node.y - 1][node.x];
    if (node.height - n.height >= -1) neighbors.push(n);
  }
  if (node.x < x_dim - 1) {
    const n = grid[node.y][node.x + 1];
    if (node.height - n.height >= -1) neighbors.push(n);
  }
  if (node.y < y_dim - 1) {
    const n = grid[node.y + 1][node.x];
    if (node.height - n.height >= -1) neighbors.push(n);
  }

  return neighbors;
}

/**
 * Gets manhattan distance from node to goal
 * @param next node
 * @param goal goal node
 * @returns manhattan distance from start to goal
 */
function getMDist(next: PQNode, goal: PQNode): number {
  return goal.x - next.x + (goal.y - next.y);
}

interface PQNode {
  x: number;
  y: number;
  priority: number;
  str_id: string;
  cost: number;
  height: number;
}

interface Coordinate {
  x: number;
  y: number;
}

part1();
part2();
