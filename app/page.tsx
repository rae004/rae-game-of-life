'use client';
import { useEffect, useState } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { nextGenerationOptimized } from '@/src/nextGeneration';
import { getGrid } from '@/src/getGrid';
import styles from '@/app/styles.module.css';
import Filters from '@/app/components/Filters';
import CellsGrid from '@/app/components/CellsGrid';

export default function GameOfLifePage() {
  const [passes, setPasses] = useState(0);
  const maxRows = 25;
  const [rows, setRows] = useQueryState('rows', parseAsInteger.withDefault(10));
  const maxCols = 25;
  const [cols, setCols] = useQueryState('cols', parseAsInteger.withDefault(10));
  const maxGens = 200;
  const [gens, setGens] = useQueryState('gens', parseAsInteger.withDefault(25));
  const [waitTime, setWaitTime] = useQueryState(
    'wait',
    parseAsInteger.withDefault(0),
  );
  const data = getData(rows, cols);
  const [population, setPopulation] = useState(data);

  const wait = (ms: number) => {
    const start = Date.now();
    let now = start;

    while (now - start < ms) {
      now = Date.now();
    }
  };
  const replay = () => {
    setPopulation(population);
    setPasses(0);
  };

  const newBoard = () => {
    setPopulation(getData(rows, cols));
    setPasses(0);
  };

  const emptyBoard = () => {
    setPopulation(getGrid(rows, cols, true));
    setPasses(0);
  };

  useEffect(() => {
    if (passes) {
      wait(waitTime);
    }

    if (passes < gens) {
      setPopulation((prev) => nextGenerationOptimized(prev, rows, cols));
      setPasses((prev) => prev + 1);
    }
  }, [passes]);

  const filterProps = {
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
    waitTime,
  };

  const populationProps = {
    population,
    setPopulation,
  };

  return (
    <div className={styles.container}>
      <Filters {...filterProps} />
      <CellsGrid {...populationProps} />
    </div>
  );
}

function getData(rows: number, cols: number) {
  return nextGenerationOptimized(getGrid(rows, cols), rows, cols);
}
