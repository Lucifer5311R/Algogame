import { useEffect, useMemo, useState } from "react";
import { findPath, type GridPoint } from "../algorithms/pathfinding";

type Difficulty = "easy" | "medium" | "hard";
type Algorithm = "bfs" | "dfs" | "astar";

const CONFIGS: Record<Difficulty, {
  width: number;
  height: number;
  goal: GridPoint;
  guardStart: GridPoint;
  walls: Set<string>;
  speed: number;
}> = {
  easy: {
    width: 5,
    height: 5,
    goal: { x: 4, y: 0 },
    guardStart: { x: 4, y: 4 },
    walls: new Set(["1,1", "2,3", "3,1"]),
    speed: 700,
  },
  medium: {
    width: 7,
    height: 7,
    goal: { x: 6, y: 0 },
    guardStart: { x: 6, y: 6 },
    walls: new Set([
      "1,1", "1,3", "2,3", "3,2",
      "3,4", "4,1", "4,4", "5,2", "5,5"
    ]),
    speed: 500,
  },
  hard: {
    width: 10,
    height: 10,
    goal: { x: 9, y: 0 },
    guardStart: { x: 9, y: 9 },
    walls: new Set([
      "1,1", "1,2", "1,4", "1,5", "1,7", "1,8",
      "3,0", "3,1", "3,3", "3,4", "3,5", "3,7", "3,8",
      "5,2", "5,3", "5,5", "5,6", "5,8",
      "7,1", "7,4", "7,7", "8,7"
    ]),
    speed: 350,
  },
};

function isSamePoint(left: GridPoint, right: GridPoint) {
  return left.x === right.x && left.y === right.y;
}

export default function StealthHunt() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [algorithm, setAlgorithm] = useState<Algorithm>("bfs");
  const [showExplored, setShowExplored] = useState(true);

  const config = CONFIGS[difficulty];
  const { width, height, goal, guardStart, walls, speed } = config;

  const [player, setPlayer] = useState<GridPoint>({ x: 0, y: 0 });
  const [guard, setGuard] = useState<GridPoint>(guardStart);
  const [turn, setTurn] = useState(1);
  const [state, setState] = useState<"playing" | "escaped" | "caught">("playing");

  // Keep player and guard positions synced when difficulty changes
  useEffect(() => {
    reset();
  }, [difficulty]);

  const playerPathResult = useMemo(() => 
    findPath(player, goal, walls, width, height, "bfs"),
    [player, goal, walls, width, height]
  );

  const guardPathResult = useMemo(() => 
    findPath(guard, player, walls, width, height, algorithm),
    [guard, player, walls, width, height, algorithm]
  );

  const route = playerPathResult.path;
  const guardRoute = guardPathResult.path;
  const guardExplored = guardPathResult.explored;

  // Convert explored list to a helper Map of keys -> exploration order index for visual overlay
  const exploredMap = useMemo(() => {
    const map = new Map<string, number>();
    guardExplored.forEach((point, index) => {
      map.set(`${point.x},${point.y}`, index);
    });
    return map;
  }, [guardExplored]);

  const status =
    state === "escaped"
      ? "You made it out of the patrol zone."
      : state === "caught"
        ? "The guard reached you before you escaped."
        : `The guard is hunting using ${algorithm.toUpperCase()} pathfinding.`;

  useEffect(() => {
    if (state !== "playing") {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextMove = guardRoute[1] ?? guard;
      setGuard(nextMove);

      if (isSamePoint(nextMove, player)) {
        setState("caught");
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [guard, guardRoute, player, state, speed]);

  function movePlayer(deltaX: number, deltaY: number) {
    if (state !== "playing") {
      return;
    }

    const next = { x: player.x + deltaX, y: player.y + deltaY };

    if (
      next.x < 0 ||
      next.y < 0 ||
      next.x >= width ||
      next.y >= height ||
      walls.has(`${next.x},${next.y}`)
    ) {
      return;
    }

    if (isSamePoint(next, goal)) {
      setPlayer(next);
      setTurn((value) => value + 1);
      setState("escaped");
      return;
    }

    setPlayer(next);
    setTurn((value) => value + 1);
  }

  // Keyboard controls listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (state !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          movePlayer(1, 0);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, player, walls]);

  function reset() {
    setPlayer({ x: 0, y: 0 });
    setGuard(config.guardStart);
    setTurn(1);
    setState("playing");
  }

  return (
    <main className="game-page">
      <section className="game-hero">
        <div>
          <div className="section-kicker">DAA PATH LAB • MODULE 04</div>
          <h1>
            Stealth Hunt
            <br />
            <span>Interactive Simulator</span>
          </h1>
          <p>
            Learn pathfinding search algorithms by escaping the zone. Choose between **BFS**, **DFS**, and **A* Search** for the guard, adjust difficulty grids, and inspect how they explore nodes.
          </p>
        </div>

        <div className="game-hero-panel">
          <span>PATROL STATUS</span>
          <strong style={{ color: state === "escaped" ? "var(--accent)" : state === "caught" ? "var(--danger)" : "inherit" }}>
            {state === "playing" ? "Active Hunt" : state === "escaped" ? "Escaped" : "Caught"}
          </strong>
          <p>{status}</p>
          <button className="button primary-button" style={{ width: "100%", marginTop: "12px" }} onClick={reset}>
            Restart Simulation
          </button>
        </div>
      </section>

      {/* Simulator Control Dashboard */}
      <section className="games-page-actions" style={{ background: "var(--panel)", padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>ALGORITHM APPROACH</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["bfs", "dfs", "astar"] as Algorithm[]).map((algo) => (
                <button
                  key={algo}
                  className={`button ${algorithm === algo ? "primary-button" : "secondary-button"}`}
                  style={{ minHeight: "36px", textTransform: "uppercase" }}
                  onClick={() => { setAlgorithm(algo); reset(); }}
                >
                  {algo === "astar" ? "A* Search" : algo.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>DIFFICULTY & GRID</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  className={`button ${difficulty === diff ? "primary-button" : "secondary-button"}`}
                  style={{ minHeight: "36px", textTransform: "uppercase" }}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff} ({CONFIGS[diff].width}x{CONFIGS[diff].height})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>VISUAL OVERLAYS</label>
            <button
              className={`button ${showExplored ? "primary-button" : "secondary-button"}`}
              style={{ minHeight: "36px" }}
              onClick={() => setShowExplored(!showExplored)}
            >
              {showExplored ? "Hide Exploration" : "Show Exploration"}
            </button>
          </div>
        </div>
      </section>

      <section className="tictactoe-layout">
        <div>
          <div
            className="tictactoe-board"
            style={{
              gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
              width: "100%",
              maxWidth: "540px",
              aspectRatio: "1",
            }}
          >
            {Array.from({ length: height }, (_, row) =>
              Array.from({ length: width }, (_, col) => {
                const cell = { x: col, y: row };
                const key = `${col},${row}`;
                const isWall = walls.has(key);
                const isPlayer = isSamePoint(player, cell);
                const isGuard = isSamePoint(guard, cell);
                const isGoal = isSamePoint(goal, cell);

                const isAdjacent = Math.abs(col - player.x) + Math.abs(row - player.y) === 1;

                // Check if this node was explored by the guard pathfinding
                const exploredIndex = exploredMap.get(key);
                const isExplored = showExplored && exploredIndex !== undefined && !isWall && !isPlayer && !isGuard && !isGoal;

                // Color node according to exploration order (older nodes are more faded/darker, newer nodes brighter)
                let exploredBg: string | undefined = undefined;
                if (isExplored && exploredIndex !== undefined) {
                  const intensity = Math.max(0.1, 0.45 - (exploredIndex / guardExplored.length) * 0.35);
                  exploredBg = algorithm === "dfs" 
                    ? `rgba(255, 78, 80, ${intensity})` 
                    : algorithm === "astar" 
                    ? `rgba(66, 152, 255, ${intensity})` 
                    : `rgba(66, 255, 152, ${intensity})`; 
                }

                return (
                  <button
                    key={`${row}-${col}`}
                    className="tictactoe-cell"
                    style={{
                      background: isWall 
                        ? "rgba(255, 111, 125, 0.15)" 
                        : isGoal 
                        ? "rgba(66, 255, 152, 0.15)" 
                        : exploredBg 
                        ? exploredBg 
                        : undefined,
                      borderColor: isPlayer 
                        ? "var(--accent)" 
                        : isGuard 
                        ? "var(--danger)" 
                        : isWall 
                        ? "rgba(255,111,125,0.3)" 
                        : undefined,
                      boxShadow: isPlayer 
                        ? "0 0 10px var(--accent)" 
                        : isGuard 
                        ? "0 0 10px var(--danger)" 
                        : undefined,
                      fontSize: "13px",
                      position: "relative",
                      opacity: isWall || isPlayer || isGuard || isGoal || isAdjacent ? 1 : 0.4,
                      cursor: isAdjacent ? "pointer" : "default"
                    }}
                    disabled={state !== "playing" || (!isAdjacent && !isPlayer && !isGuard && !isGoal)}
                    onClick={() => movePlayer(col - player.x, row - player.y)}
                  >
                    {isWall ? "■" : isPlayer ? "P" : isGuard ? "G" : isGoal ? "Exit" : ""}
                    {isExplored && exploredIndex !== undefined && (
                      <span style={{ position: "absolute", bottom: "2px", right: "4px", fontSize: "7px", color: "rgba(255,255,255,0.5)", fontFamily: "Share Tech Mono" }}>
                        #{exploredIndex + 1}
                      </span>
                    )}
                  </button>
                );
              }),
            )}
          </div>
          <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--muted)", textAlign: "center", fontFamily: "Share Tech Mono" }}>
            * Navigate tile-by-tile clicking adjacent squares or using Arrow Keys / WASD.
          </div>
        </div>

        <aside className="game-sidecard">
          <div className="section-kicker">COMPARATIVE ANALYSIS</div>
          <h2 style={{ textTransform: "capitalize" }}>{algorithm} Search behavior</h2>
          <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--muted)" }}>
            {algorithm === "bfs" && "BFS explores nodes level by level, outward. It guarantees the absolute shortest path on unweighted grids, but explores a high number of nodes."}
            {algorithm === "dfs" && "DFS explores deep along each branch before backtracking. It is highly memory efficient in some scenarios but does not guarantee the shortest path."}
            {algorithm === "astar" && "A* uses a heuristic (distance to goal) to guide exploration. It expands nodes directly toward the target, significantly reducing the node count."}
          </p>

          <div className="game-side-stats">
            <div>
              <span>Player Moves (Turn)</span>
              <strong>{turn}</strong>
            </div>
            <div>
              <span>Your Exit Route</span>
              <strong>{route.length > 0 ? `${route.length - 1} steps` : "Blocked"}</strong>
            </div>
            <div>
              <span>Nodes Explored by Guard</span>
              <strong style={{ color: "var(--accent)" }}>{guardExplored.length}</strong>
            </div>
            <div>
              <span>Guard Steps to You</span>
              <strong>{guardRoute.length > 0 ? `${guardRoute.length - 1} steps` : "Blocked"}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="game-learning">
        <div className="learning-header">
          <div className="section-kicker">ALGORITHM COMPARISON</div>
          <h2>Implementation Details</h2>
        </div>

        <div className="learning-grid">
          <div className="learning-code">
            <pre>
              {algorithm === "bfs" && `queue = [start]
visited = {start}
while queue:
  curr = queue.pop(0)
  for neigh in neighbors(curr):
    if not visited:
      visited.add(neigh)
      queue.append(neigh)`}
              {algorithm === "dfs" && `stack = [start]
visited = {start}
while stack:
  curr = stack.pop()
  for neigh in neighbors(curr):
    if not visited:
      visited.add(neigh)
      stack.append(neigh)`}
              {algorithm === "astar" && `open_set = [start]
g_score[start] = 0
f_score[start] = heuristic(start)
while open_set:
  curr = node_with_lowest_f(open_set)
  for neigh in neighbors(curr):
    tentative_g = g_score[curr] + 1
    if tentative_g < g_score[neigh]:
      g_score[neigh] = tentative_g
      f_score[neigh] = g_score[neigh] + h(neigh)`}
            </pre>
          </div>

          <div className="learning-steps">
            <h3>Student observations</h3>
            <ol>
              <li>Compare how many nodes were explored (highlighted cells). Notice A* expands fewer cells than BFS.</li>
              <li>Observe how DFS crawls along a single path, sometimes wrapping around walls inefficiently.</li>
              <li>Change difficulties to see how the complexity of maze layouts affects search efficiency.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
