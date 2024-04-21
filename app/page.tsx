'use client';
import * as React from 'react';
import { useState } from 'react';

const lifeSimulation = [
  [1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
];

export default function Page() {
  const data = getData();
  const [population, setPopulation] = useState(data);

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <p>{population.length}</p>
      <div className={'flex flex-col'}>
        {population.map((row, rowIdx) => (
          <div key={rowIdx} className={'flex-row'}>
            {row.map((node, nodeIdx) => (
              <input
                key={nodeIdx}
                id={`${rowIdx}-${nodeIdx}`}
                type={'checkbox'}
                checked={node === 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getData() {
  return lifeSimulation;
}
