import { useMemo, useState } from "react";

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

const rows = 8;
const cols = 8;
const mines = 10;

function createBoard(): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  );
}

function cloneBoard(board: Cell[][]) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function getNeighbors(row: number, col: number) {
  const neighbors: [number, number][] = [];

  for (let r = -1; r <= 1; r += 1) {
    for (let c = -1; c <= 1; c += 1) {
      if (r === 0 && c === 0) {
        continue;
      }

      const nextRow = row + r;
      const nextCol = col + c;

      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
        neighbors.push([nextRow, nextCol]);
      }
    }
  }

  return neighbors;
}

function placeMines(board: Cell[][], safeRow: number, safeCol: number) {
  const safeCells = new Set([`${safeRow},${safeCol}`]);
  const candidateCells: [number, number][] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!safeCells.has(`${row},${col}`)) {
        candidateCells.push([row, col]);
      }
    }
  }

  for (let index = candidateCells.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = candidateCells[index];
    const target = candidateCells[swapIndex];
    [candidateCells[index], candidateCells[swapIndex]] = [target, current];
  }

  for (let index = 0; index < mines; index += 1) {
    const [mineRow, mineCol] = candidateCells[index];
    board[mineRow][mineCol].mine = true;
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      let count = 0;

      for (const [neighborRow, neighborCol] of getNeighbors(row, col)) {
        if (board[neighborRow][neighborCol].mine) {
          count += 1;
        }
      }

      board[row][col].adjacent = count;
    }
  }
}

function floodReveal(board: Cell[][], row: number, col: number) {
  const stack: [number, number][] = [[row, col]];

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop()!;
    const cell = board[currentRow][currentCol];

    if (cell.revealed || cell.flagged) {
      continue;
    }

    cell.revealed = true;

    if (cell.adjacent !== 0) {
      continue;
    }

    for (const [neighborRow, neighborCol] of getNeighbors(currentRow, currentCol)) {
      const neighbor = board[neighborRow][neighborCol];

      if (!neighbor.revealed && !neighbor.mine && !neighbor.flagged) {
        stack.push([neighborRow, neighborCol]);
      }
    }
  }
}

function revealMines(board: Cell[][]) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (board[row][col].mine) {
        board[row][col].revealed = true;
      }
    }
  }
}

function hasWon(board: Cell[][]) {
  return board.every((row) =>
    row.every((cell) => (cell.mine ? true : cell.revealed)),
  );
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard());
  const [status, setStatus] = useState("Reveal a safe tile to start the board.");
  const [hasStarted, setHasStarted] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [won, setWon] = useState(false);

  const remaining = useMemo(
    () => board.flat().filter((cell) => !cell.revealed && !cell.mine).length,
    [board],
  );

  function resetBoard() {
    setBoard(createBoard());
    setStatus("Reveal a safe tile to start the board.");
    setHasStarted(false);
    setHasLost(false);
    setWon(false);
  }

  function revealCell(row: number, col: number) {
    if (hasLost || won || board[row][col].flagged || board[row][col].revealed) {
      return;
    }

    setBoard((current) => {
      const next = cloneBoard(current);

      if (!hasStarted) {
        placeMines(next, row, col);
        setHasStarted(true);
      }

      if (next[row][col].mine) {
        revealMines(next);
        setHasLost(true);
        setStatus("Boom. You triggered a mine.");
        return next;
      }

      floodReveal(next, row, col);

      if (hasWon(next)) {
        setWon(true);
        setStatus("Board cleared. Every safe cell has been revealed.");
      } else {
        setStatus("Logic is holding. The grid is still safe.");
      }

      return next;
    });
  }

  function toggleFlag(row: number, col: number) {
    if (hasLost || won || board[row][col].revealed) {
      return;
    }

    setBoard((current) => {
      const next = cloneBoard(current);
      next[row][col].flagged = !next[row][col].flagged;
      return next;
    });
  }

  return (
    <main className="game-page">
      <section className="game-hero">
        <div>
          <div className="section-kicker">GAME MODULE 02</div>
          <h1>
            Minesweeper
            <br />
            <span>built around probability.</span>
          </h1>
          <p>
            Clear the board without detonating a mine. Each revealed number tells you how many neighboring tiles are dangerous, which turns the grid into a logic puzzle.
          </p>
        </div>

        <div className="game-hero-panel">
          <span>STATUS</span>
          <strong>{hasLost ? "Exploded" : won ? "Cleared" : "Board active"}</strong>
          <p>{status}</p>
          <button className="button secondary-button" onClick={resetBoard}>New board</button>
        </div>
      </section>

      <section className="tictactoe-layout">
        <div className="tictactoe-board" style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="tictactoe-cell"
                style={{
                  color: cell.mine && cell.revealed ? "#ff6f7d" : undefined,
                  background: cell.revealed && !cell.mine ? "rgba(66,255,152,0.08)" : undefined,
                }}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  toggleFlag(rowIndex, colIndex);
                }}
              >
                {cell.flagged && !cell.revealed ? "⚑" : cell.revealed && cell.mine ? "✹" : cell.revealed && cell.adjacent > 0 ? cell.adjacent : ""}
              </button>
            )),
          )}
        </div>

        <aside className="game-sidecard">
          <div className="section-kicker">PROBABILITY</div>
          <h2>Every click narrows the risk model.</h2>
          <p>
            Number clues act as a local decision engine. Once a safe region is exposed, the remaining uncertainty collapses into a smaller, easier puzzle.
          </p>

          <div className="game-side-stats">
            <div>
              <span>Safe cells</span>
              <strong>{remaining}</strong>
            </div>
            <div>
              <span>Flag mode</span>
              <strong>Right-click</strong>
            </div>
            <div>
              <span>Board</span>
              <strong>{rows}×{cols}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="game-learning">
        <div className="learning-header">
          <div className="section-kicker">ALGORITHM NOTES</div>
          <h2>Neighbor-count logic</h2>
        </div>

        <div className="learning-grid">
          <div className="learning-code">
            <pre>{`for each cell:
  count = 0
  for each neighbor:
    if neighbor is a mine:
      count += 1
  reveal count`}</pre>
          </div>

          <div className="learning-steps">
            <h3>Student guide</h3>
            <ol>
              <li>Check a tile and inspect its neighboring cells.</li>
              <li>Count how many bombs touch that position.</li>
              <li>Use the number to infer which adjacent tiles are safe.</li>
              <li>Expand the safe region by flood-revealing nearby empties.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
