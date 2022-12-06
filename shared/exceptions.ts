export class NoElementException {
  private readonly message: string | null;
  readonly type: string = "NoElementException";

  constructor(message: string | null = null) {
    this.message = message;
  }

  getMessage(): string | null {
    return this.message;
  }
}
