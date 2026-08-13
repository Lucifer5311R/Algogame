# AlgoGame: DAA Interactive Learning Platform

AlgoGame is a premium, interactive web-based playground designed for **Design and Analysis of Algorithms (DAA)**. It turns abstract algorithmic concepts into playable games, live trace animations, and real-life scenarios, helping students visualize and understand complex logic.

---

## 🚀 Key Modules & Visualizations

### 1. Sorting Visualizer (Code Animation & Flashcards)
* **Visual Traversal**: Watch array elements sort in real-time with responsive height bars and vibrant HSL gradients.
* **Pseudocode Highlight Tracer**: Synchronizes array comparison and swaps with the exact line of execution in pseudocode.
* **Custom Datasets**: Allows students to input custom comma-separated numbers (validated between 5 and 100) to test edge cases.
* **Real-Life Use Case Flashcards**: Learn how and where these algorithms are used in actual systems (e.g., Flash Memory wear reduction, Avionics schedulers, and Spreadsheet sorting stability).

### 2. Stealth Hunt (Pathfinding Simulator)
* **Goal**: Escape the grid tile-by-tile while an intelligent guard patrols and chases you.
* **Movement Constraints**: Restricts player teleportation; players must move step-by-step using clicked adjacent tiles or **Keyboard controls (Arrow Keys / WASD)**.
* **Multi-Algorithm Patrol**: Switch the guard's pathfinding algorithm between **BFS** (Breadth-First Search), **DFS** (Depth-First Search), and **A\* Search** (using Manhattan heuristics).
* **Live Exploration Overlay**: Displays the algorithm's search frontier and closed lists directly on the grid, labeled with step counters (e.g., `#1`, `#2`).

### 3. Sudoku (Backtracking Visualizer)
* **Backtracking Trace**: Animate the solver step-by-step (with play, pause, step, and speed controls).
* **DOM Highlights**: Watch the algorithm flash **Green** when inserting a valid candidate on a branch, and flash **Red** when backtracking after hitting conflicts.
* **Complexity Metrics**: Displays active recursion depth, currently evaluated value, and state changes.

### 4. Recursion Tree (Call Stack Explorer)
* **Tree Generation**: Computes and draws call trees for Fibonacci calculations ($N = 3, 4, 5$) using vector SVGs.
* **Stack Trace**: Highlights active node invocations and displays evaluated return results under finished tree nodes.
* **Call Stack Frame Panel**: Displays a live simulation of the compiler runtime call stack frame (pushing on invocation, popping on return).

### 5. Code Lab (IDE Workspace)
* **Monaco Editor Integration**: Features a full Microsoft Monaco Editor with Python syntax highlighting, automatic indentations, line numbers, and custom options.
* **LocalStorage DOM Portfolio**: Saves student modifications and logic reflections locally. The **"Your Saved Ideas Portfolio"** renders these saved snippets directly in the DOM for immediate review.

---

## 🛠️ Technology Stack
* **Framework**: React 19 + TypeScript + Vite
* **Styling**: Vanilla CSS with glassmorphism, HSL tailors, and micro-animations.
* **Icons**: Lucide React
* **Editor**: `@monaco-editor/react` (Microsoft Monaco Editor wrapper)

---

## 💻 Getting Started

### Installation
Install project dependencies:
```bash
npm install
```

### Run Locally
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Build Production Bundle
Build for production:
```bash
npm run build
```
The output will be in the `/dist` directory.

---

## 🤖 AI Collaboration & Human Intervention Acknowledgment

This DAA Interactive Learning Platform was built through a collaborative pair-programming synergy between **Antigravity (Google DeepMind's Advanced Agentic Coding AI)** and **Durgadutt S B (Human Developer)**.

### Human Developer Interventions & Contributions:
* **Feature Vision & Direction**: Set the core project goals (transitioning from a static visualizer to an interactive, informative DAA workspace).
* **Restricting Cheating/Teleports**: Mandated and directed the implementation of step-by-step movement constraints and keyboard controls inside the Stealth Hunt pathfinding simulator.
* **Developer Workspace Upgrades**: Requested the replacement of basic textareas with Microsoft Monaco Editor for the student Code Lab.
* **Reactive DOM Displays**: Ideated and verified the local DOM submissions portfolio to display saved notes and python snippets reactively.
* **Pedagogical Additions**: Directed the implementation of minimax difficulty depth-bounding in Tic-Tac-Toe, custom sorting dataset configurations, recursive tree tracing, and real-life use-case flashcards.

### AI Agent Contributions:
* Generated structural pathfinding code for BFS/DFS/A* search, backtracking state step-recorders, and SVG-rendered recursion tree visualizations.
* Implemented the modern dark-themed glassmorphism system CSS tokens, custom scrollbars, and card micro-animations.
* Handled lint cleanup, dependency compilation checks, and automated build verification.
