export function getNodeOutput(
  newGrid: number[][],
  rows: number,
  cols: number,
): string {
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
