'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { nextGenerationOptimized } from '@/src/nextGeneration';
import { getGrid } from '@/src/getGrid';
import styles from '@/app/styles.module.css';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function GameOfLifePage() {
  const [passes, setPasses] = useState(0);
  const maxRows = 25;
  const [rows, setRows] = useQueryState('rows', parseAsInteger.withDefault(10));
  const maxCols = 25;
  const [cols, setCols] = useQueryState('cols', parseAsInteger.withDefault(10));
  const maxGens = 200;
  const [gens, setGens] = useQueryState('gens', parseAsInteger.withDefault(25));
  const data = getData(rows, cols);
  const [population, setPopulation] = useState(data);

  const replay = () => {
    setPopulation(population);
    setPasses(0);
  };

  const newBoard = () => {
    setPopulation(getData(rows, cols));
    setPasses(0);
  };

  useEffect(() => {
    if (passes < gens) {
      setPopulation((prev) => nextGenerationOptimized(prev, rows, cols));
      setPasses((prev) => prev + 1);
    }
  }, [passes, rows]);

  return (
    <div className={styles.container}>
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
            }).then((searchParams) => console.warn(searchParams));
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
            }).then((searchParams) => console.warn(searchParams));
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
            }).then((searchParams) => console.warn(searchParams));
          }}
        />
        <span className={`${styles.filterLabel} ${styles.filterSpan}`}>
          Passes: {passes}
        </span>
        <button className={styles.replayButton} onClick={replay}>
          Replay
        </button>
        <button className={styles.replayButton} onClick={newBoard}>
          New Board
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
                checked={node === 1}
                className={styles.roundedCheckbox}
                onChange={() => {
                  const newPopulation = [...population];
                  newPopulation[rowIdx][nodeIdx] = newPopulation[rowIdx][
                    nodeIdx
                  ]
                    ? 0
                    : 1;
                  setPopulation(newPopulation);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getData(rows: number, cols: number) {
  return nextGenerationOptimized(getGrid(rows, cols), rows, cols);
}
