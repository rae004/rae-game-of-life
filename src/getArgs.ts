export function getGenerationsArg(
  args: string[],
  defaultGenerations = 2,
): number {
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

export function getRowsArg(args: string[], defaultRows = 20): number {
  const hasLongFlag = args.indexOf('--rows') > -1;
  if (hasLongFlag) {
    const rows = parseInt(args[args.indexOf('--rows') + 1]);
    if (isNaN(rows) || rows < 0) {
      throw new Error(
        'Rows arg passed without a value. Rows should be a positive number',
      );
    }

    return rows;
  }

  const hasShortFlag = args.indexOf('-r') > -1;
  if (hasShortFlag) {
    const rows = parseInt(args[args.indexOf('-r') + 1]);
    if (isNaN(rows) || rows < 0) {
      throw new Error(
        'Rows arg passed without a value. Rows should be a positive number',
      );
    }

    return rows;
  }

  return defaultRows;
}

export function getColsArg(args: string[], defaultCols = 60): number {
  const hasLongFlag = args.indexOf('--cols') > -1;
  if (hasLongFlag) {
    const cols = parseInt(args[args.indexOf('--cols') + 1]);
    if (isNaN(cols) || cols < 0) {
      throw new Error(
        'Cols arg passed without a value. Cols should be a positive number',
      );
    }

    return cols;
  }

  const hasShortFlag = args.indexOf('-c') > -1;
  if (hasShortFlag) {
    const cols = parseInt(args[args.indexOf('-c') + 1]);
    if (isNaN(cols) || cols < 0) {
      throw new Error(
        'Cols arg passed without a value. Cols should be a positive number',
      );
    }

    return cols;
  }

  return defaultCols;
}
