export default class Monkey {
  private test: number;
  private items: number[];
  private operation: (input: number) => number;
  private trueMonkey: number;
  private falseMonkey: number;
  private inspections: number;
  private big: boolean;
  private bigMod: number | null;

  constructor(lines: string, big: boolean = false) {
    // Set inspections to 0;
    this.inspections = 0;

    // Set big
    this.big = big;
    this.bigMod = null;

    const splitLines = lines.split("\n");
    // We don't care about the first line, it only contains the Monkey's number.
    // Get items
    this.items =
      splitLines[1].match(/[0-9]+/g)?.map((itemStr) => parseInt(itemStr)) ?? [];

    // Get division test for items
    this.test = parseInt(splitLines[3].match(/[0-9]+/g)?.at(0) ?? "");
    if (Number.isNaN(this.test)) {
      // Input parse error check
      throw new Error("Invalid test value.");
    }

    // Get test passing monkey number
    this.trueMonkey = parseInt(splitLines[4].match(/[0-9]+/g)?.at(0) ?? "");
    if (Number.isNaN(this.trueMonkey)) {
      // Input parse error check
      throw new Error("Invalid monkey number for true condition");
    }

    // Get test failing monkey number
    this.falseMonkey = parseInt(splitLines[5].match(/[0-9]+/g)?.at(0) ?? "");
    if (Number.isNaN(this.falseMonkey)) {
      // Input parse error check
      throw new Error("Invalid monkey number for false condition");
    }

    // Get the operation. Annoying parse.
    // First, get just the part after "new = "
    const opStr = splitLines[2].substring(splitLines[2].indexOf("=") + 2);

    // Then, get the operator. Simple regex match. I'm assuming that operand will always be
    // * or +, based on the example input and my input.
    const opChar = opStr.match(/[*+]/g)?.at(0);

    // Finally, get operands and construct function. I'm assuming that the
    // first operand will always be 'old', based on the example input and my input.
    if (opStr.match(/old/g)?.length === 2) {
      // Two old operands.
      if (opChar === "*") {
        this.operation = (input) => input * input;
      } else {
        // opChar === '+'
        this.operation = (input) => input + input;
      }
    } else {
      // Get second operand
      const secondOp = parseInt(opStr.match(/[0-9]+/g)?.at(0) ?? "");
      if (Number.isNaN(secondOp)) {
        throw new Error("Unparseable second operand of operation");
      }
      if (opChar === "*") {
        this.operation = (input) => input * secondOp;
      } else {
        // opChar === '+'
        this.operation = (input) => input + secondOp;
      }
    }
  }

  // This is pretty much just for debugging
  getItems(): number[] {
    return this.items;
  }

  throwAll(): MonkeyThrow[] {
    // Complete inspection operation for all items
    this.items = this.items.map((item) => this.operation(item));

    // Increment inspection count
    this.inspections += this.items.length;

    // Divide all worry levels by 3 if !this.big
    if (!this.big) {
      this.items = this.items.map((item) => Math.floor(item / 3));
    } else {
      // Must handle big numbers by modding by bigMod.
      // If bigMod is unset, throw an error
      if (this.bigMod === null) {
        throw new Error("bigMod value unset.");
      }
      this.items = this.items.map((item) => item % this.bigMod!);
    }

    const throwItems = this.items.map((item) => {
      return {
        item: item,
        monkeyNumber:
          item % this.test === 0 ? this.trueMonkey : this.falseMonkey,
      };
    });

    this.items = [];
    return throwItems;
  }

  catchItem(item: number) {
    this.items.push(item);
  }

  getInspectionCount(): number {
    return this.inspections;
  }

  getTest(): number {
    return this.test;
  }

  setBigMod(bigMod: number): void {
    this.bigMod = bigMod;
  }
}

export interface MonkeyThrow {
  monkeyNumber: number;
  item: number;
}
