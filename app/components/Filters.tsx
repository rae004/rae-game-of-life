import styles from '@/app/styles.module.css';
import WaitTimeSelector from '@/app/components/WaitTimeSelector';
import FilterInputs from '@/app/components/FilterInputs';

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
    setWaitTime,
  } = props;

  const filterInputProps = {
    maxRows,
    rows,
    setRows,
    maxCols,
    cols,
    setCols,
    maxGens,
    gens,
    setGens,
  };

  return (
    <>
      <div className={styles.filterRow}>
        <FilterInputs {...filterInputProps} />
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
        <WaitTimeSelector setWaitTime={setWaitTime} />
      </div>
    </>
  );
}
