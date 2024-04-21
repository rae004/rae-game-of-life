import * as os from 'os';

function nextGeneration(grid: any, M: any, N: any) {
  const future = new Array(M).fill(0).map(() => new Array(N).fill(0));

  // loop through every cell
  for (let l = 0; l < M; l++) {
    for (let m = 0; m < N; m++) {
      // find number of neighbors that are alive
      let aliveNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (l + i >= 0 && l + i < M && m + j >= 0 && m + j < N) {
            aliveNeighbours += grid[l + i][m + j];
          }
        }
      }
      // The cell needs to be subtracted from
      // its neighbours as it was counted before
      aliveNeighbours -= grid[l][m];

      // Implementing the Rules of Life
      // Cell is lonely and dies
      if (grid[l][m] == 1 && aliveNeighbours < 2) future[l][m] = 0;
      // Cell dies due to over population
      else if (grid[l][m] == 1 && aliveNeighbours > 3) future[l][m] = 0;
      // A new cell is born
      else if (grid[l][m] == 0 && aliveNeighbours == 3) future[l][m] = 1;
      // Remains the same
      else future[l][m] = grid[l][m];
    }
  }

  return future;
}

function getOutput(newGrid: number[][], rows: number, cols: number): string {
  let output = '';

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (newGrid[i][j] == 0) output += '.';
      else output += '*';
    }
    output += '\n';
  }

  return output;
}

function getGenerations(args: string[], defaultGenerations = 2): number {
  const hasLongFlag = args.indexOf('--generations') > -1;
  if (hasLongFlag) {
    const generations = parseInt(args[args.indexOf('--generations') + 1]);
    if (isNaN(generations) || generations < 0) {
      throw new Error(
        'Generations arg passed without a value. Generations should be a positive number',
      );
    }

    return generations;
  }

  const hasShortFlag = args.indexOf('-g') > -1;
  if (hasShortFlag) {
    const generations = parseInt(args[args.indexOf('-g') + 1]);
    if (isNaN(generations) || generations < 0) {
      throw new Error(
        'Generations arg passed without a value. Generations should be a positive number',
      );
    }

    return generations;
  }

  return defaultGenerations;
}

const gridSize = [20, 60];
const ROWS = gridSize[0],
  COLS = gridSize[1];

// Initializing the grid.
let grid = Array.from({ length: ROWS }, () =>
  Array.from({ length: COLS }, () => Math.round(Math.random())),
);

process.stdout.write('Hello, RAE Dev Game of Life! \n' + os.EOL);
/// Run the simulation for the given number of generations
for (let i = 0; i < getGenerations(process.argv, 3); i++) {
  let output = '';
  process.stdout.write('Generation ' + (i + 1) + os.EOL);
  grid = nextGeneration(grid, ROWS, COLS);
  output = getOutput(grid, ROWS, COLS);
  process.stdout.write(output + os.EOL);
}
