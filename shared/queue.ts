import { NoElementException } from "./exceptions";

export default class Queue<QType> {
  private arr: QType[];

  constructor() {
    this.arr = [];
  }

  size(): number {
    return this.arr.length;
  }

  enqueue(...elements: QType[]): void {
    this.arr.push(...elements);
  }

  dequeue(): QType {
    const element = this.arr.shift();
    if (element === undefined) throw new NoElementException("Queue is empty");
    return element;
  }

  contains(find: QType): boolean {
    return this.arr.includes(find);
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }

  peek(): QType {
    if (this.isEmpty()) throw new NoElementException("Queue is empty");
    return this.arr[0];
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
    return `<<[${this.arr.toString()}]<<`;
  }
}
