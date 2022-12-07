/**
 * Class representing a single file in a filesystem
 */
export default class File {
  /** Size of the file */
  private size: number;

  /** Name of the file */
  private name: string;

  /**
   * Constructs a new File with the given name and size
   * @param name the name of the file
   * @param size the size of the file
   */
  constructor(name: string, size: number) {
    this.size = size;
    this.name = name;
  }

  /**
   * Gets the name of the file
   * @returns the file name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the size of the file
   * @returns the file size
   */
  getSize(): number {
    return this.size;
  }
}
