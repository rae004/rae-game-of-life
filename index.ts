import * as os from 'os';
import { nextGenerationOptimized } from '@/src/nextGeneration';
import { getNodeOutput } from '@/src/getNodeConsoleOutput';
import { getColsArg, getGenerationsArg, getRowsArg } from '@/src/getArgs';
import { getGrid } from '@/src/getGrid';

export function gameOfLife(rows?: number, cols?: number, gens?: number) {
  const ROWS = rows ? rows : getRowsArg(process.argv);
  const COLS = cols ? cols : getColsArg(process.argv);
  const GENS = gens ? gens : getGenerationsArg(process.argv, 3);

  // Initializing the grid.
  const grids = [];
  let grid = getGrid(ROWS, COLS);

  process.stdout.write('Hello, RAE Dev Game of Life! \n' + os.EOL);
  /// Run the simulation for the given number of generations
  for (let i = 0; i < GENS; i++) {
    let output = '';
    process.stdout.write('Generation ' + (i + 1) + os.EOL);
    grid = nextGenerationOptimized(grid, ROWS, COLS);
    grids.push(grid);
    output = getNodeOutput(grid, ROWS, COLS);
    process.stdout.write(output + os.EOL);
  }

  return grids;
}
gameOfLife();
