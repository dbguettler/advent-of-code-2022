import { getLines } from "../shared/utils";
import Directory from "./directory";
import File from "./file";

function getAllDirectories(): Directory[] {
  // Get input file as an array of command arrays
  const command: string[][] = getLines(process.argv, "$ ").map((line) =>
    line.trimEnd().split("\n")
  );

  // The first array will only include an empty string, so just toss that element
  command.shift();

  // Start by making root directory
  const root: Directory = new Directory("/", null);
  let currentDir: Directory = root;

  for (const cmd of command) {
    if (cmd[0].startsWith("ls")) {
      // Handle ls
      cmd.shift(); // Pop off "ls" command

      // Add in discovered subdirectories and files
      for (const item of cmd) {
        if (item.startsWith("dir ")) {
          // Add subdirectory
          const subdir = new Directory(item.substring(item.indexOf(" ") + 1));
          currentDir.addSubdirectory(subdir);
        } else {
          // Add file
          const separatorIdx = item.indexOf(" ");
          const file = new File(
            item.substring(separatorIdx + 1),
            parseInt(item.substring(0, separatorIdx))
          );

          currentDir.addFile(file);
        }
      }
    } else {
      // Handle cd
      const dirname = cmd[0].substring(cmd[0].indexOf(" ") + 1); // Get directory name
      if (dirname === "/") {
        // Switch to root
        currentDir = root;
      } else if (dirname === "..") {
        // Switch to parent, if it exists. If none exists, log a semi-helpful error and quit.
        const temp: Directory | null = currentDir.getParent();
        if (temp === null) {
          console.error(`Found no parent directory of ${currentDir.getName()}`);
          process.exit(1);
        }
        currentDir = temp;
      } else {
        // Switch to named child, if it exists. If none exists, log a semi-helpful error and quit.
        const temp: Directory | null = currentDir.getSubdirectory(dirname);
        if (temp === null) {
          console.error(
            `Could not find subdirectory ${dirname} of ${currentDir.getName()}`
          );
          process.exit(1);
        }
        currentDir = temp;
      }
    }
  }

  // Return root directory and all subdirectories recursively
  return [root, ...root.getAllSubdirectories()];
}

function part1(): void {
  console.time("Runtime 1");

  const allDirs = getAllDirectories();

  // Sum up all directories under 100000 size
  const MIN_SIZE = 100000;
  let sum = 0;
  for (const dir of allDirs) {
    if (dir.getSize() <= MIN_SIZE) {
      sum += dir.getSize();
    }
  }

  console.timeEnd("Runtime 1");
  console.log(sum);
}

function part2(): void {
  console.time("Runtime 2");
  const allDirs = getAllDirectories();

  const FILESYSTEM_SIZE = 70000000;
  const FREE_SPACE_NEEDED = 30000000;

  // Get root directory size. Root is the first in the array.
  const rootSize = allDirs[0].getSize();
  const freeSpace = FILESYSTEM_SIZE - rootSize;

  // Sort array of directories by ascending size
  allDirs.sort((a, b) => a.getSize() - b.getSize());

  let deletedSize = -1;
  for (const dir of allDirs) {
    if (freeSpace + dir.getSize() >= FREE_SPACE_NEEDED) {
      deletedSize = dir.getSize();
      break;
    }
  }

  console.timeEnd("Runtime 2");
  console.log(deletedSize);
}

part1();
part2();
