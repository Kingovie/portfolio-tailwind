'use client';

import { useMemo } from 'react';

const ROWS = 7;
const COLS = 52;

function randomLevel(): number {
  const rand = Math.random();
  if (rand < 0.35) return 0;
  if (rand < 0.6) return 1;
  if (rand < 0.85) return 2;
  return 3;
}

function generateGrid(): { level: number; delay: number; duration: number }[][] {
  return Array.from({ length: COLS }, () =>
    Array.from({ length: ROWS }, () => ({
      level: randomLevel(),
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }))
  );
}

export function HeatmapGrid() {
  const grid = useMemo(() => generateGrid(), []);

  return (
    <div className="relative w-full overflow-hidden mt-16">
      <div className="flex gap-1 justify-center opacity-40">
        {grid.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1">
            {col.map((cell, rowIdx) => (
              <div
                key={rowIdx}
                className="heatmap-cell"
                style={{
                  animation: `heatmap-pulse ${cell.duration}s ease-in-out ${cell.delay}s infinite`,
                  animationDelay: `${cell.delay}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
