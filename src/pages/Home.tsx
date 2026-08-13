import { Brain, Code2, Gamepad2 } from "lucide-react";

import {
  AlgorithmTable,
  GameCard,
  HeroButtons,
  HeroMeta,
  Principle,
  SectionHeader,
} from "../components/Shared";
import { algorithms, games, type Section } from "../data/algorithms";

function AlgorithmScene() {
  const nodes = [
    { x: 20, y: 25, visited: true },
    { x: 40, y: 20, visited: true, path: true },
    { x: 60, y: 30, visited: true },
    { x: 80, y: 25, visited: false },
    { x: 25, y: 50, visited: true, path: true },
    { x: 50, y: 45, visited: true, path: true },
    { x: 75, y: 55, visited: true },
    { x: 30, y: 75, visited: false },
    { x: 60, y: 70, visited: true, path: true },
    { x: 80, y: 75, visited: true, path: true },
  ];

  const connections = [
    { from: 0, to: 1, active: true },
    { from: 0, to: 4, active: true, path: true },
    { from: 1, to: 2, active: true },
    { from: 1, to: 5, active: true },
    { from: 2, to: 3, active: false },
    { from: 2, to: 6, active: true },
    { from: 4, to: 5, active: true, path: true },
    { from: 5, to: 8, active: true, path: true },
    { from: 6, to: 9, active: false },
    { from: 7, to: 8, active: false },
    { from: 8, to: 9, active: true, path: true },
  ];

  return (
    <div className="algorithm-scene">
      <div className="scene-label">
        <span className="live-dot" />
        DAA PATH VISION (A* SIMULATION)
      </div>

      <div className="scene-grid">
        {/* SVG Connections for perfect network aesthetics */}
        <svg className="scene-svg" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9bffd0" />
              <stop offset="100%" stopColor="#42ff98" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {connections.map((conn, idx) => {
            const start = nodes[conn.from];
            const end = nodes[conn.to];
            return (
              <line
                key={idx}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={conn.path ? "url(#pathGradient)" : conn.active ? "rgba(66, 255, 152, 0.25)" : "rgba(66, 255, 152, 0.08)"}
                strokeWidth={conn.path ? 3 : conn.active ? 1.5 : 1}
                strokeDasharray={conn.path ? "6, 4" : undefined}
                className={conn.path ? "path-line-animated" : undefined}
                filter={conn.path ? "url(#glow)" : undefined}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => (
          <div
            key={index}
            className={`scene-node ${node.visited ? "visited" : ""} ${node.path ? "path" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.path && <span className="node-pulse" />}
          </div>
        ))}

        <div className="scene-player" style={{ left: '25%', top: '50%' }}>◆</div>
        <div className="scene-goal" style={{ left: '80%', top: '75%' }}>◎</div>

        <div className="scene-tooltip">
          <span>A* SEARCH</span>
          <strong>Path Cost: 12.4ms</strong>
        </div>
      </div>

      <div className="scene-stats">
        <div>
          <span>Nodes Visited</span>
          <strong>8 / 10</strong>
        </div>
        <div>
          <span>Path Quality</span>
          <strong>100% Optimal</strong>
        </div>
        <div>
          <span>Complexity</span>
          <strong>O(E log V)</strong>
        </div>
      </div>
    </div>
  );
}

export default function Home({
  navigate,
}: {
  navigate: (section: Section) => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="hero-label">
            <span className="status-dot" />
            DESIGN & ANALYSIS OF ALGORITHMS
          </div>

          <h1>
            Algorithms
            <br />
            <span>but playable.</span>
          </h1>

          <p className="hero-description">
            A visual playground where algorithms become games, decisions become visible,
            and theory becomes something you can actually experience.
          </p>

          <HeroButtons navigate={navigate} />
          <HeroMeta />
        </div>

        <div className="hero-visual">
          <AlgorithmScene />
        </div>
      </section>

      <section className="intro-section">
        <div className="section-kicker">THE IDEA</div>

        <h2>
          Stop memorizing algorithms.
          <br />
          <span>Start seeing them.</span>
        </h2>

        <p>
          AlgoGame turns abstract algorithmic concepts into interactive experiences.
          Play the problem, watch the algorithm make decisions, inspect the logic, and
          understand why the solution works.
        </p>

        <div className="principles">
          <Principle
            number="01"
            icon={<Gamepad2 />}
            title="Play"
            text="Experience the algorithm inside an actual game."
          />
          <Principle
            number="02"
            icon={<Brain />}
            title="Understand"
            text="Visualize every important decision and state."
          />
          <Principle
            number="03"
            icon={<Code2 />}
            title="Experiment"
            text="Explore the implementation and change the logic."
          />
        </div>
      </section>

      <section className="games-section">
        <SectionHeader
          kicker="GAME LIBRARY"
          title="Where algorithms become mechanics."
          action="View all games"
          onAction={() => navigate("games")}
        />

        <div className="game-grid">
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              game={game}
              index={index}
              onPlay={() => navigate(game.section)}
            />
          ))}
        </div>
      </section>

      <section className="algorithm-preview">
        <SectionHeader
          kicker="ALGORITHM EXPLORER"
          title="The logic behind the games."
          action="Explore algorithms"
          onAction={() => navigate("algorithms")}
        />

        <AlgorithmTable algorithms={algorithms} />
      </section>

      <section className="code-preview">
        <div>
          <div className="section-kicker">CODE LAB</div>

          <h2>
            See what's
            <br />
            <span>underneath.</span>
          </h2>

          <p>
            Explore the Python implementation behind the algorithms and understand the
            logic line by line.
          </p>

          <button className="button secondary-button" onClick={() => navigate("code")}>
            Open Code Lab
            <span>→</span>
          </button>
        </div>

        <div className="code-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <label>binary_search.py</label>
          </div>

          <pre>
            <code>{`def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}