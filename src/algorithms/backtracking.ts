export type SudokuBoard = number[][];

export type SudokuStep = {
  board: SudokuBoard;
  row: number;
  col: number;
  value: number;
  status: "placement" | "backtrack" | "success" | "init";
};

export function cloneBoard(board: SudokuBoard): SudokuBoard {
  return board.map((row) => [...row]);
}

export function findEmptyCell(board: SudokuBoard): [number, number] | null {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }

  return null;
}

export function isValidPlacement(
  board: SudokuBoard,
  row: number,
  col: number,
  value: number,
): boolean {
  for (let index = 0; index < 9; index += 1) {
    if (board[row][index] === value && index !== col) {
      return false;
    }

    if (board[index][col] === value && index !== row) {
      return false;
    }
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const boardRow = boxRow + r;
      const boardCol = boxCol + c;

      if (boardRow === row && boardCol === col) {
        continue;
      }

      if (board[boardRow][boardCol] === value) {
        return false;
      }
    }
  }

  return true;
}

export function solveSudoku(board: SudokuBoard): SudokuBoard | null {
  const copy = cloneBoard(board);

  const solve = (working: SudokuBoard): boolean => {
    const empty = findEmptyCell(working);

    if (!empty) {
      return true;
    }

    const [row, col] = empty;

    for (let value = 1; value <= 9; value += 1) {
      if (!isValidPlacement(working, row, col, value)) {
        continue;
      }

      working[row][col] = value;

      if (solve(working)) {
        return true;
      }

      working[row][col] = 0;
    }

    return false;
  };

  return solve(copy) ? copy : null;
}

export function generateSudokuSolveSteps(board: SudokuBoard): SudokuStep[] {
  const steps: SudokuStep[] = [];
  const copy = cloneBoard(board);

  steps.push({
    board: cloneBoard(copy),
    row: -1,
    col: -1,
    value: 0,
    status: "init"
  });

  const solve = (working: SudokuBoard): boolean => {
    const empty = findEmptyCell(working);

    if (!empty) {
      steps.push({
        board: cloneBoard(working),
        row: -1,
        col: -1,
        value: 0,
        status: "success"
      });
      return true;
    }

    const [row, col] = empty;

    for (let value = 1; value <= 9; value += 1) {
      if (!isValidPlacement(working, row, col, value)) {
        continue;
      }

      working[row][col] = value;
      steps.push({
        board: cloneBoard(working),
        row,
        col,
        value,
        status: "placement"
      });

      // Limit step recording to 1000 to prevent browser crashes on hard boards
      if (steps.length > 1000) {
        return true; 
      }

      if (solve(working)) {
        return true;
      }

      working[row][col] = 0;
      steps.push({
        board: cloneBoard(working),
        row,
        col,
        value: 0,
        status: "backtrack"
      });
    }

    return false;
  };

  solve(copy);
  return steps;
}
