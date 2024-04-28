import styles from '@/app/styles.module.css';
import * as React from 'react';

export default function CellsGrid({ ...props }: Record<string, any>) {
  const { population, setPopulation } = props;

  return (
    <div className={styles.grid}>
      {population.map((row: number[], rowIdx: number) => (
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
                newPopulation[rowIdx][nodeIdx] = newPopulation[rowIdx][nodeIdx]
                  ? 0
                  : 1;
                setPopulation(newPopulation);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
