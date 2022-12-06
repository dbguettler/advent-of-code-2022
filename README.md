# Advent of Code 2022

![Current Day Badge](https://img.shields.io/badge/day%20📅-5-blue)
![Stars Badge](https://img.shields.io/badge/stars%20⭐-10-yellow)
![Days Completed Badge](https://img.shields.io/badge/days%20completed-5-red)

Included is code from Advent of Code 2022. Each day has a folder, with solution code and the debug and given input files.

## Compiling

To compile all code, run

```
tsc
```

in the root of the project.

To compile a specific day, such as day two, run:

```
tsc day2/main
```

## Running

As an example, to run day one code in debug mode (with small input file):

```bash
cd day1
node main debug
```

To run with full size input file, simply exclude the `debug` argument:

```bash
cd day1
node main
```

## Files

The main code file for each day is provided in `main.ts`, with the files `input-sm.txt` for the example small input file and `input-lg.txt` for the full size provided input. Any useful utility functions used across multiple days are included in `shared/utils.ts`.
