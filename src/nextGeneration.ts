export function nextGeneration(grid: number[][], M: number, N: number) {
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
