# Advent of Code 2022

![Current Day Badge](https://img.shields.io/badge/day%20📅-19-blue)
![Stars Badge](https://img.shields.io/badge/stars%20⭐-28-yellow)
![Days Completed Badge](https://img.shields.io/badge/days%20completed-14-red)

Included is code from Advent of Code 2022. Each day has a folder, with solution code and the debug and given input files.

## Installing Dependencies

You will need to have node and npm installed, I recommend using `nvm` to install both. [This guide](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm), while suited for WSL, worked well for me.

Then, you will need to install typescript globally, using:
```
npm i -g typescript
```

Finally, you will need to install NodeJS type definitions, by running the following in the repo root:
```
npm i
```

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

Note that it is necessary to run from the specific day directory, as the input files are searched based on the directory that the command is run from.

## Files

The main code file for each day is provided in `main.ts`, with the files `input-sm.txt` for the example small input file and `input-lg.txt` for the full size provided input. Any useful utility functions used across multiple days are included in `shared/utils.ts`.
