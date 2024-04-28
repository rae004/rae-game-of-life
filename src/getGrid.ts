export function getGrid(
  rows: number,
  columns: number,
  allZeros = false,
): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () =>
      Math.round(allZeros ? 0 : Math.random()),
    ),
  );
}
