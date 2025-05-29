'use client';

import { useEffect, useRef, useState } from 'react';

export const Conway = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying] = useState(true);
  const cellSize = 5; // Size of each cell in pixels
  const gridRef = useRef<boolean[][]>([]);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);

  // Initialize grid
  const initGrid = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    widthRef.current = Math.floor(canvas.width / cellSize);
    heightRef.current = Math.floor(canvas.height / cellSize);

    // Initialize empty grid
    gridRef.current = Array(heightRef.current)
      .fill(null)
      .map(() => Array(widthRef.current).fill(false));

    // Randomly populate some cells
    for (let i = 0; i < heightRef.current; i++) {
      for (let j = 0; j < widthRef.current; j++) {
        if (Math.random() < 0.1) {
          gridRef.current[i][j] = true;
        }
      }
    }
  };

  // Draw the current state
  const draw = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(225, 88, 88, 0.1)';
    ctx.strokeStyle = 'rgba(225, 88, 88, 0.1)';

    for (let i = 0; i < heightRef.current; i++) {
      for (let j = 0; j < widthRef.current; j++) {
        if (gridRef.current[i][j]) {
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
          ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  // Calculate next generation
  const nextGeneration = () => {
    const newGrid = Array(heightRef.current)
      .fill(null)
      .map(() => Array(widthRef.current).fill(false));

    for (let i = 0; i < heightRef.current; i++) {
      for (let j = 0; j < widthRef.current; j++) {
        const neighbors = countNeighbors(i, j);
        if (gridRef.current[i][j]) {
          newGrid[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          newGrid[i][j] = neighbors === 3;
        }
      }
    }

    gridRef.current = newGrid;
  };

  // Count live neighbors
  const countNeighbors = (row: number, col: number) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = (row + i + heightRef.current) % heightRef.current;
        const newCol = (col + j + widthRef.current) % widthRef.current;
        if (gridRef.current[newRow][newCol]) count++;
      }
    }
    return count;
  };

  // Add random cells periodically
  const addRandomCells = () => {
    const numCells = 5;
    for (let i = 0; i < numCells; i++) {
      const row = Math.floor(Math.random() * heightRef.current);
      const col = Math.floor(Math.random() * widthRef.current);
      gridRef.current[row][col] = true;
    }
  };

  // Handle click to add cells
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    // Add various patterns including some explosive ones
    const patterns = [
      // Single cell
      [[1]],
      // Small block
      [
        [1, 1],
        [1, 1],
      ],
      // Glider
      [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
      ],
      // Explosive pattern 1
      [
        [0, 1, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 0],
      ],
      // Explosive pattern 2
      [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
      ],
      // Random cluster
      [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    ];

    // Spawn multiple patterns around the click point
    const numPatterns = 5; // Number of patterns to spawn
    for (let p = 0; p < numPatterns; p++) {
      // Randomly select a pattern
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];

      // Add some random offset to the click position
      const offsetRow = row + Math.floor(Math.random() * 10) - 5;
      const offsetCol = col + Math.floor(Math.random() * 10) - 5;

      // Add the pattern at offset location
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[0].length; j++) {
          const newRow = offsetRow + i;
          const newCol = offsetCol + j;

          // Only place cells if they're within the grid bounds
          if (
            newRow >= 0 &&
            newRow < heightRef.current &&
            newCol >= 0 &&
            newCol < widthRef.current
          ) {
            if (Math.random() < 0.9) {
              // 90% chance to place each cell
              gridRef.current[newRow][newCol] = pattern[i][j] === 1;
            }
          }
        }
      }
    }

    // Force a redraw
    draw();
  };

  useEffect(() => {
    initGrid();
    draw();

    // Game loop
    const interval = setInterval(() => {
      if (isPlaying) {
        nextGeneration();
        if (Math.random() < 0.1) {
          addRandomCells();
        }
        draw();
      }
    }, 100);

    // Random cell spawn interval
    const spawnInterval = setInterval(() => {
      if (isPlaying) {
        addRandomCells();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(spawnInterval);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="fixed top-0 left-0 w-full h-full"
    />
  );
};
