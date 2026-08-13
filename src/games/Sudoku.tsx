import { useEffect, useMemo, useRef, useState } from "react";
import { cloneBoard, isValidPlacement, generateSudokuSolveSteps, type SudokuStep } from "../algorithms/backtracking";
import { Play, Pause, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function isBoardSolved(board: number[][]) {
  return board.every((row) => row.every((value) => value !== 0));
}

export default function Sudoku() {
  const [board, setBoard] = useState<number[][]>(() => cloneBoard(initialBoard));
  const [selected, setSelected] = useState<[number, number] | null>(null);

  // Visualization States
  const [steps, setSteps] = useState<SudokuStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(60);

  const timerRef = useRef<number | null>(null);

  const activeStep: SudokuStep = steps.length > 0 
    ? steps[currentStep] 
    : { board, row: -1, col: -1, value: 0, status: "init" };

  const isSolved = useMemo(() => isBoardSolved(activeStep.board), [activeStep.board]);


  function handleCellClick(row: number, col: number) {
    if (running) return;
    setSelected([row, col]);
  }

  function handleValueInput(value: number) {
    if (!selected || running) return;
    const [row, col] = selected;

    if (initialBoard[row][col] !== 0) return;

    setBoard((current) => {
      const next = cloneBoard(current);
      if (value === 0) {
        next[row][col] = 0;
        return next;
      }

      if (!isValidPlacement(next, row, col, value)) return current;
      next[row][col] = value;
      return next;
    });

    // Clear visualization steps since manual edit occurred
    setSteps([]);
    setCurrentStep(0);
  }

  function resetBoard() {
    stopSolver();
    setBoard(cloneBoard(initialBoard));
    setSelected(null);
    setSteps([]);
    setCurrentStep(0);
  }

  function stopSolver() {
    setRunning(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function startSolver() {
    if (steps.length === 0) {
      const solveSteps = generateSudokuSolveSteps(board);
      setSteps(solveSteps);
      setCurrentStep(0);
    }
    setRunning(true);
  }

  function stepNext() {
    if (steps.length === 0) {
      const solveSteps = generateSudokuSolveSteps(board);
      setSteps(solveSteps);
      setCurrentStep(0);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }

  function stepPrev() {
    if (steps.length === 0) return;
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  // Backtracking Animation Runner
  useEffect(() => {
    if (!running || steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setRunning(false);
      return;
    }

    const delay = Math.max(10, 350 - speed * 3.2);
    timerRef.current = window.setTimeout(() => {
      setCurrentStep((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= steps.length - 1) {
          setRunning(false);
        }
        return nextVal;
      });
    }, delay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [running, currentStep, steps, speed]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const activeBoard = activeStep.board;

  return (
    <main className="game-page">
      <section className="game-hero">
        <div>
          <div className="section-kicker">GAME MODULE 03</div>
          <h1>
            Sudoku
            <br />
            <span>powered by backtracking.</span>
          </h1>
          <p>
            Learn recursion and depth-first backtracking. Run the animated solver to watch how the search tree expands and undoes wrong candidates in real-time.
          </p>
        </div>

        <div className="game-hero-panel">
          <span>STATUS</span>
          <strong style={{ color: isSolved ? "var(--accent)" : "inherit" }}>
            {isSolved ? "Solved!" : activeStep.status === "backtrack" ? "Backtracking..." : "Searching Branch"}
          </strong>
          <p>Step {steps.length > 0 ? `${currentStep + 1} / ${steps.length}` : "0 (Ready)"}</p>
          <button className="button secondary-button" style={{ width: "100%", marginTop: "10px" }} onClick={resetBoard}>Reset Board</button>
        </div>
      </section>

      {/* Solver Action Bar */}
      <section className="games-page-actions" style={{ background: "var(--panel)", padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>BACKTRACKING CONTROLS</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {!running ? (
                <button className="button primary-button" style={{ minHeight: "36px" }} onClick={startSolver}>
                  <Play size={14} fill="currentColor" /> Play Solver
                </button>
              ) : (
                <button className="button primary-button" style={{ minHeight: "36px" }} onClick={stopSolver}>
                  <Pause size={14} /> Pause
                </button>
              )}
              <button className="button secondary-button" style={{ minHeight: "36px" }} disabled={running || currentStep === 0} onClick={stepPrev}>
                <ChevronLeft size={14} /> Prev
              </button>
              <button className="button secondary-button" style={{ minHeight: "36px" }} disabled={running || (steps.length > 0 && currentStep === steps.length - 1)} onClick={stepNext}>
                Next <ChevronRight size={14} />
              </button>
              <button className="button secondary-button" style={{ minHeight: "36px" }} onClick={resetBoard}>
                <RefreshCw size={14} /> Clear
              </button>
            </div>
          </div>

          <div style={{ flexGrow: 1, maxWidth: "200px" }}>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>SOLVER SPEED</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </div>
        </div>
      </section>

      <section className="tictactoe-layout">
        <div className="tictactoe-board" style={{ gridTemplateColumns: "repeat(9, minmax(0, 1fr))", width: "100%", maxWidth: "450px" }}>
          {activeBoard.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const isSelected = selected?.[0] === rowIndex && selected?.[1] === colIndex;
              const isFixed = initialBoard[rowIndex][colIndex] !== 0;
              const isBoxBoundary = (colIndex + 1) % 3 === 0 && colIndex !== 8;
              const isRowBoundary = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;

              // Check if cell is active in visualization step
              const isActiveNode = activeStep.row === rowIndex && activeStep.col === colIndex;
              const status = activeStep.status;

              let cellBg: string | undefined = undefined;
              if (isActiveNode) {
                cellBg = status === "backtrack" 
                  ? "rgba(255, 111, 125, 0.4)" // Red flash for backtrack
                  : "rgba(66, 255, 152, 0.4)"; // Green flash for placing candidates
              }

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`tictactoe-cell ${isSelected ? "winning" : ""}`}
                  style={{
                    borderRight: isBoxBoundary ? "2px solid rgba(66, 255, 152, 0.45)" : undefined,
                    borderBottom: isRowBoundary ? "2px solid rgba(66, 255, 152, 0.45)" : undefined,
                    color: isFixed ? "#fff" : cellBg ? "#fff" : "var(--accent-light)",
                    background: cellBg ? cellBg : undefined,
                    boxShadow: isActiveNode ? `0 0 15px ${status === "backtrack" ? "var(--danger)" : "var(--accent)"}` : undefined
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={running}
                >
                  {value === 0 ? "" : value}
                </button>
              );
            }),
          )}
        </div>

        <aside className="game-sidecard">
          <div className="section-kicker">BACKTRACKING STATE</div>
          <h2>Interactive Visualizer</h2>
          <p>
            Watch the algorithm search depth-first. When it hits a dead end (violating row/column rules), it rolls back the state and tries the next number.
          </p>

          <div className="game-side-stats">
            <div>
              <span>Recursion Depth</span>
              <strong>{steps.length > 0 ? activeStep.row >= 0 ? `${activeStep.row * 9 + activeStep.col}` : "Success" : "0"}</strong>
            </div>
            <div>
              <span>Evaluated Value</span>
              <strong style={{ color: activeStep.status === "backtrack" ? "var(--danger)" : "var(--accent)" }}>
                {activeStep.value > 0 ? activeStep.value : "-"}
              </strong>
            </div>
            <div>
              <span>Operation</span>
              <strong style={{ textTransform: "uppercase" }}>{activeStep.status}</strong>
            </div>
          </div>

          {!running && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginTop: 18 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                <button
                  key={value}
                  className="button secondary-button"
                  style={{ minHeight: 38, padding: "0 10px", fontSize: 12 }}
                  onClick={() => handleValueInput(value)}
                >
                  {value}
                </button>
              ))}
              <button
                key="clear"
                className="button secondary-button"
                style={{ minHeight: 38, padding: "0 10px", fontSize: 12, gridColumn: "span 3" }}
                onClick={() => handleValueInput(0)}
              >
                Clear cell
              </button>
            </div>
          )}
        </aside>
      </section>

      <section className="game-learning">
        <div className="learning-header">
          <div className="section-kicker">ALGORITHM NOTES</div>
          <h2>Backtracking search</h2>
        </div>

        <div className="learning-grid">
          <div className="learning-code">
            <pre>{`solve(board):
  empty = find empty cell
  if none: return true

  for value in 1..9:
    if valid(row, col, value):
      place(value)
      if solve(board): return true
      undo(value)

  return false`}</pre>
          </div>

          <div className="learning-steps">
            <h3>Student guide</h3>
            <ol>
              <li>Select Play Solver to see recursion visual backtracking in action.</li>
              <li>Observe how cells flash red when the solver has to backtrack (undoing a choice).</li>
              <li>Try entering numbers manually and see if you can solve the remaining cells without generating conflicts.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
