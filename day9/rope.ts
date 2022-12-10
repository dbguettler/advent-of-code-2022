/**
 * Class representing the rope
 */
export default class Rope {
  /** Tail knot of rope */
  private tail: Knot;

  /** Position of rope head */
  private position: Position;

  /** All knots excluding head and tail */
  private knots: Knot[];

  /**
   * Construct a new rope.
   * @param knotCount number of knots in rope, including head and tail
   */
  constructor(knotCount: number) {
    // Start at (0, 0)
    this.position = { x: 0, y: 0 };

    // Create new tail knot. Tail knots track the number of spaces they've visited
    this.tail = new Knot(true);

    // Create array of non-head, non-tail knots
    this.knots = new Array(knotCount - 2);
    for (let i = 0; i < this.knots.length; i++) {
      this.knots[i] = new Knot(false);
    }
  }

  /**
   * Moves the head of the rope n times in the specified direction, updating each knot along the way.
   * @param d the direction to move in
   * @param n the number of times to move (n steps)
   */
  move(d: Direction, n: number): void {
    // For each step:
    for (let i = 0; i < n; i++) {
      // Adjust head position based on direction
      switch (d) {
        case Direction.Up:
          this.position.y++;
          break;
        case Direction.Down:
          this.position.y--;
          break;
        case Direction.Right:
          this.position.x++;
          break;
        case Direction.Left:
          this.position.x--;
          break;
      }

      // Update knot based on head or preceding knot
      for (let i = 0; i < this.knots.length; i++) {
        this.knots[i].updatePosition(
          i === 0 ? this.position : this.knots[i - 1].getPosition()
        );
      }

      // Update tail based on head or preceding knot
      this.tail.updatePosition(
        this.knots.length
          ? this.knots[this.knots.length - 1].getPosition()
          : this.position
      );
    }
  }

  /**
   * Get the number of spaces visited by the tail knot
   * @returns number of spaces visited by tail
   */
  getTailVisited(): number {
    return this.tail.getVisitedCount();
  }
}

/**
 * Class representing a knot on the rope. Not exported as it should not be
 * used outside of the Rope class.
 */
class Knot {
  /** Position of knot */
  private position: Position;

  /** Set of visited positions, tracked by stringified position */
  private visited: Set<string> | null;

  /** Whether the knot is the tail of the rope */
  private isTail: boolean;

  /**
   * Construct a new knot.
   * @param isTail whether the knot is the tail of the rope (tail knots track visited spaces)
   */
  constructor(isTail: boolean) {
    // Set position
    this.position = { x: 0, y: 0 };

    // If this is the tail, construct the visited set and add the starting position
    this.isTail = isTail;
    if (this.isTail) {
      this.visited = new Set<string>();
      this.visited.add(JSON.stringify(this.position));
    } else {
      this.visited = null;
    }
  }

  /**
   * Update the position of the knot based on the knot in front of it
   * @param precedePos position of the preceding knot or head of rope
   */
  updatePosition(precedePos: Position): void {
    if (!this.mustMove(precedePos)) return;
    if (this.position.x === precedePos.x) {
      // X is the same, just need to adjust up/down
      this.position.y += this.position.y > precedePos.y ? -1 : 1;
    } else if (this.position.y === precedePos.y) {
      // Y is the same, just need to adjust left/right
      this.position.x += this.position.x > precedePos.x ? -1 : 1;
    } else {
      // Need to move diagonally.
      this.position.x += precedePos.x > this.position.x ? 1 : -1;
      this.position.y += precedePos.y > this.position.y ? 1 : -1;
    }
    if (this.isTail) {
      // The null check isn't really necessary, because isTail checks that,
      // but TypeScript doesn't know that so this stops it from complaining
      this.visited?.add(JSON.stringify(this.position));
    }
  }

  /**
   * Determines if the knot must move based on its position and that of the
   * preceding knot or rope head.
   * @param precedePos position of preceding knot, or rope head
   * @returns whether the knot must move
   */
  mustMove(precedePos: Position): boolean {
    return (
      Math.abs(this.position.x - precedePos.x) > 1 ||
      Math.abs(this.position.y - precedePos.y) > 1
    );
  }

  /**
   * Gets a copy of the knot's position
   * @returns copy of knot's position
   */
  getPosition(): Position {
    return { x: this.position.x, y: this.position.y };
  }

  /**
   * Get the number of distinct positions visited by the knot. If
   * the knot is not a tail, returns -1.
   * @returns number of visited positions by knot, or -1 if not a tail
   */
  getVisitedCount(): number {
    return this.visited?.size ?? -1;
  }
}

/**
 * Position of rope head or knot
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Directions to move rope head
 */
export enum Direction {
  Up,
  Down,
  Left,
  Right,
}
