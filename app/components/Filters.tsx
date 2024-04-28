import styles from '@/app/styles.module.css';

export default function Filters({ ...props }: Record<string, any>) {
  const {
    passes,
    maxRows,
    rows,
    setRows,
    maxCols,
    cols,
    setCols,
    maxGens,
    gens,
    setGens,
    replay,
    newBoard,
    emptyBoard,
  } = props;

  return (
    <>
      <div className={styles.filterRow}>
        <label htmlFor="rows" className={`${styles.filterLabel}`}>
          Rows:{' '}
        </label>
        <input
          id={'rows'}
          name={'rows'}
          value={rows}
          className={styles.filterInput}
          onChange={(e) => {
            setRows(() => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) return 0;
              return value < maxRows ? value : maxRows;
            }).then((searchParams: URLSearchParams) =>
              console.warn(searchParams),
            );
          }}
        />
        <label htmlFor="cols" className={`${styles.filterLabel}`}>
          Columns:{' '}
        </label>
        <input
          id={'cols'}
          name={'cols'}
          value={cols}
          className={styles.filterInput}
          onChange={(e) => {
            setCols(() => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) return 0;
              return value < maxCols ? value : maxCols;
            }).then((searchParams: URLSearchParams) =>
              console.warn(searchParams),
            );
          }}
        />
        <label htmlFor="gens" className={`${styles.filterLabel}`}>
          Generations:{' '}
        </label>
        <input
          id={'gens'}
          name={'gens'}
          value={gens}
          className={styles.filterInput}
          onChange={(e) => {
            setGens(() => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) return 0;
              return value < maxGens ? value : maxGens;
            }).then((searchParams: URLSearchParams) =>
              console.warn(searchParams),
            );
          }}
        />
        <span className={`${styles.filterLabel} ${styles.filterSpan}`}>
          Passes: {passes}
        </span>
      </div>
      <div className={styles.filterRow2}>
        <button className={styles.replayButton} onClick={replay}>
          Replay
        </button>
        <button className={styles.replayButton} onClick={newBoard}>
          New Board
        </button>
        <button className={styles.replayButton} onClick={emptyBoard}>
          Empty Board
        </button>
      </div>
    </>
  );
}
