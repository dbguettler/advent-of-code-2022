import File from "./file";

/**
 * Class representing a single directory in a filesystem
 */
export default class Directory {
  /** Files directly located in this directory */
  private readonly files: File[];

  /** Parent directory (or null if this is the filesystem root) */
  private parent: Directory | null;

  /** Child directories/subdirectories of this directory */
  private readonly children: Directory[];

  /** Name of the directory */
  private readonly name: string;

  /**
   * Constructs a new Directory instance.
   * @param name the name of the directory (required)
   * @param parent the directory's parent directory (if unspecified, null)
   * @param files the files located in this directory (if unspecified, empty array)
   * @param children the subdirectories of this directory (if unspecified, empty array)
   */
  constructor(
    name: string,
    parent: Directory | null = null,
    files: File[] = [],
    children: Directory[] = []
  ) {
    this.name = name;
    this.files = files;
    this.children = children;
    this.parent = parent;
  }

  /**
   * Gets the name of the directory
   * @returns the directory's name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Recursively gets the size of the directory. The size is defined as the sum of the sizes
   * of all files in this directory or anywhere below it.
   * @returns the directory's size, recursively
   */
  getSize(): number {
    return (
      this.files.reduce((size, f) => size + f.getSize(), 0) +
      this.children.reduce((size, d) => size + d.getSize(), 0)
    );
  }

  /**
   * Gets the parent of this directory, if it exits
   * @returns parent Directory instance, or null
   */
  getParent(): Directory | null {
    return this.parent;
  }

  /**
   * Adds the given file to this directory
   * @param f the file to add
   */
  addFile(f: File): void {
    this.files.push(f);
  }

  /**
   * Adds the given Directory instance as a subdirectory of this directory. The parent
   * does not need to be set before adding, it will be set by this method.
   * @param s the directory to add as a subdirectory
   */
  addSubdirectory(s: Directory): void {
    s.parent = this;
    this.children.push(s);
  }

  /**
   * Gets the subdirectory with the given name, if it exists. Does not search recursively.
   * @param name the name of the subdirectory to get
   * @returns the subdirectory with the given name, or null
   */
  getSubdirectory(name: string): Directory | null {
    const subdir = this.children.find((item) => item.getName() === name);
    return subdir ?? null;
  }

  /**
   * Gets all the subdirectories of this directory recursively. Ordering is an in-order depth-first traversal.
   * @returns a list of all subdirectories (searches recursively)
   */
  getAllSubdirectories(): Directory[] {
    const list = [];
    for (const dir of this.children) {
      list.push(dir);
      list.push(...dir.getAllSubdirectories());
    }
    return list;
  }
}
