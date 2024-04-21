import * as os from 'os';
import { nextGeneration } from '@/src/nextGeneration';
import { getNodeOutput } from '@/src/getNodeConsoleOutput';
import { getColsArg, getGenerationsArg, getRowsArg } from '@/src/getArgs';

const [ROWS, COLS] = [getRowsArg(process.argv), getColsArg(process.argv)];

// Initializing the grid.
let grid = Array.from({ length: ROWS }, () =>
  Array.from({ length: COLS }, () => Math.round(Math.random())),
);

process.stdout.write('Hello, RAE Dev Game of Life! \n' + os.EOL);
/// Run the simulation for the given number of generations
for (let i = 0; i < getGenerationsArg(process.argv, 3); i++) {
  let output = '';
  process.stdout.write('Generation ' + (i + 1) + os.EOL);
  grid = nextGeneration(grid, ROWS, COLS);
  output = getNodeOutput(grid, ROWS, COLS);
  process.stdout.write(output + os.EOL);
}
