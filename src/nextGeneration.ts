export function nextGenerationOptimized(
  grid: number[][],
  M: number,
  N: number,
) {
  // Initialize the future grid and the neighbor counts grid
  const future = new Array(M).fill(0).map(() => new Array(N).fill(0));
  const neighborCounts = new Array(M).fill(0).map(() => new Array(N).fill(0));

  // Compute the initial neighbor counts
  for (let l = 0; l < M; l++) {
    for (let m = 0; m < N; m++) {
      if (grid[l][m] !== undefined && grid[l][m] === 1) {
        updateNeighborCounts(neighborCounts, l, m, M, N, 1);
      }
    }
  }

  // Compute the next generation
  for (let l = 0; l < M; l++) {
    for (let m = 0; m < N; m++) {
      const aliveNeighbours = neighborCounts[l][m];

      // Implementing the Rules of Life
      if (grid[l][m] === 1 && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        future[l][m] = 0;
        updateNeighborCounts(neighborCounts, l, m, M, N, -1);
      } else if (grid[l][m] === 0 && aliveNeighbours === 3) {
        future[l][m] = 1;
        updateNeighborCounts(neighborCounts, l, m, M, N, 1);
      } else {
        future[l][m] = grid[l][m];
      }
    }
  }

  return future;
}

function updateNeighborCounts(
  neighborCounts: number[][],
  l: number,
  m: number,
  M: number,
  N: number,
  delta: number,
) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const x = l + i;
      const y = m + j;
      if (x >= 0 && x < M && y >= 0 && y < N) {
        neighborCounts[x][y] += delta;
      }
    }
  }
}
