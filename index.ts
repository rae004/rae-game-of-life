console.log('Hello, Nodemon World!');

function nextGeneration(grid: any, M: any, N: any) {
  const future = new Array(M).fill(0).map(() => new Array(N).fill(0));

  let output = '';
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

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (future[i][j] == 0) output += '.';
      else output += '*';
    }
    output += '\n';
  }
  console.log(output);

  return future;
}

const M = 10,
  N = 10;

// Initializing the grid.
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const generations = 2;
let newGrid = [];

console.log('Original Generation\n');
newGrid = nextGeneration(grid, M, N);
for (let i = 0; i < generations; i++) {
  console.log('Generation ' + (i + 1) + '\n');
  newGrid = nextGeneration(newGrid, M, N);
}
console.log('Final Generation\n');
nextGeneration(newGrid, M, N);
