import { NoElementException } from "./exceptions";

export default class Stack<SType> {
  private arr: SType[];

  constructor() {
    this.arr = [];
  }

  size(): number {
    return this.arr.length;
  }

  push(...elements: SType[]): void {
    this.arr.push(...elements);
  }

  pop(): SType {
    const element = this.arr.pop();
    if (element === undefined) throw new NoElementException("Stack is empty");
    return element;
  }

  contains(find: SType): boolean {
    return this.arr.includes(find);
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }

  peek(): SType {
    if (this.isEmpty()) throw new NoElementException("Stack is empty");
    return this.arr[this.arr.length - 1];
  }

  hasDuplicates(): boolean {
    if (this.isEmpty()) return false;

    const s = new Set();
    for (const element of this.arr) {
      if (s.has(element)) {
        return true;
      }
      s.add(element);
    }

    return false;
  }

  toString(): string {
    return `||[${this.arr.toString()}]<>`;
  }
}
