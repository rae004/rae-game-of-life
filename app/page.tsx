'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { nextGeneration } from '@/src/nextGeneration';
import { getGrid } from '@/src/getGrid';
import styles from '@/app/styles.module.css';

const ROWS = 25;
const COLS = 50;
const GENS = 25;

export default function Page() {
  const data = getData();
  const [population, setPopulation] = useState(data);
  const [passes, setPasses] = useState(0);
  console.log('passes', passes);

  const replay = () => {
    setPopulation(getData());
    setPasses(0);
  };

  useEffect(() => {
    if (passes < GENS) {
      setPopulation((prev) => nextGeneration(prev, ROWS, COLS));
      setPasses((prev) => prev + 1);
    }
  }, [passes]);

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        <p>Rows: {population.length}</p>
        <p>Passes: {passes}</p>
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

function getData() {
  // return lifeSimulation;
  return nextGeneration(getGrid(ROWS, COLS), ROWS, COLS);
}
