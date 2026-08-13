export type Section =
  | "home"
  | "games"
  | "algorithms"
  | "code"
  | "tictactoe"
  | "sudoku"
  | "minesweeper"
  | "recursion"
  | "stealth"
  | "community"
  | "analysis";

export type GameItem = {
  title: string;
  description: string;
  algorithm: string;
  icon: string;
  section: Exclude<Section, "home" | "games" | "algorithms" | "code">;
};

export type AlgorithmItem = {
  category: string;
  name: string;
  complexity: string;
};

export const games: GameItem[] = [
  {
    title: "Tic-Tac-Toe AI",
    description:
      "Challenge an AI that thinks ahead using the Minimax algorithm.",
    algorithm: "MINIMAX",
    icon: "♟",
    section: "tictactoe",
  },
  {
    title: "Minesweeper",
    description:
      "Navigate a randomly generated minefield using logic and probability.",
    algorithm: "RANDOM + GRID",
    icon: "💣",
    section: "minesweeper",
  },
  {
    title: "Stealth Hunt",
    description:
      "Escape an intelligent guard powered by graph pathfinding algorithms.",
    algorithm: "BFS • DFS • A*",
    icon: "◉",
    section: "stealth",
  },
  {
    title: "Sudoku",
    description:
      "Watch backtracking explore thousands of possibilities to solve the puzzle.",
    algorithm: "BACKTRACKING",
    icon: "9",
    section: "sudoku",
  },
];

export const algorithms: AlgorithmItem[] = [
  { category: "SEARCHING", name: "Binary Search", complexity: "O(log n)" },
  { category: "SORTING", name: "Merge Sort", complexity: "O(n log n)" },
  { category: "SORTING", name: "Quick Sort", complexity: "O(n log n)" },
  { category: "GRAPH", name: "BFS", complexity: "O(V + E)" },
  {
    category: "GRAPH",
    name: "Dijkstra",
    complexity: "O((V + E) log V)",
  },
  {
    category: "PARADIGM",
    name: "Dynamic Programming",
    complexity: "Problem dependent",
  },
];