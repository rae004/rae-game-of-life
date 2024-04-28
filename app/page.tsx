'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { nextGeneration } from '@/src/nextGeneration';
import { getGrid } from '@/src/getGrid';
import styles from '@/app/styles.module.css';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function Page() {
  const [passes, setPasses] = useState(0);
  const maxRows = 25;
  const [rows, setRows] = useQueryState('rows', parseAsInteger.withDefault(10));
  const maxCols = 25;
  const [cols, setCols] = useQueryState('cols', parseAsInteger.withDefault(10));
  const maxGens = 1000;
  const [gens, setGens] = useQueryState('gens', parseAsInteger.withDefault(25));
  const data = getData(rows, cols);
  const [population, setPopulation] = useState(data);

  const replay = () => {
    setPopulation(getData(rows, cols));
    setPasses(0);
  };

  useEffect(() => {
    if (passes < gens) {
      setPopulation((prev) => nextGeneration(prev, rows, cols));
      setPasses((prev) => prev + 1);
    }
  }, [passes, rows]);

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        <label htmlFor="rows" className={styles.filterLabel}>
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
            }).then((searchParams) => console.log(searchParams));
          }}
        />
        <label htmlFor="rows" className={styles.filterLabel}>
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
            }).then((searchParams) => console.log(searchParams));
          }}
        />
        <label htmlFor="gens" className={styles.filterLabel}>
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
              return value < 1000 ? value : maxGens;
            }).then((searchParams) => console.log(searchParams));
          }}
        />
        <button className={styles.replayButton} onClick={replay}>
          Replay
        </button>
      </div>
      <div className={styles.grid}>
        {population.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <input
                key={nodeIdx}
                id={`${rowIdx}-${nodeIdx}`}
                type={'checkbox'}
                // defaultChecked={node === 1}
                checked={node === 1}
                className={styles.roundedCheckbox}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getData(rows: number, cols: number) {
  // return lifeSimulation;
  return nextGeneration(getGrid(rows, cols), rows, cols);
}
