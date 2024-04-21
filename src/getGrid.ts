export function getGrid(rows: number, columns: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => Math.round(Math.random())),
  );
}
