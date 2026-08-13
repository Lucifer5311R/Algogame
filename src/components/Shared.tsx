import { ArrowRight, Brain, Code2, Menu, Network, Play, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";

import type { AlgorithmItem, GameItem, Section } from "../data/algorithms";

export function Navbar({
  section,
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  section: Section;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  navigate: (section: Section) => void;
}) {
  const links: { label: string; value: Section }[] = [
    { label: "Games", value: "games" },
    { label: "Algorithms", value: "algorithms" },
    { label: "Recursion Tree", value: "recursion" },
    { label: "Code Lab", value: "code" },
  ];

  return (
    <header className="navbar">
      <button className="brand" onClick={() => navigate("home")}>
        <span className="brand-mark">
          <Network size={18} />
        </span>

        <span>
          Algo<span className="brand-accent">Game</span>
        </span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <button
            key={link.value}
            className={section === link.value ? "active" : ""}
            onClick={() => navigate(link.value)}
          >
            {link.label}
          </button>
        ))}

        <button className="nav-cta" onClick={() => navigate("games")}>
          Play Now
          <ArrowRight size={15} />
        </button>
      </nav>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}

export function HeroMeta() {
  return (
    <div className="hero-meta">
      <span>
        <Sparkles size={14} />
        Interactive
      </span>

      <span>
        <Brain size={14} />
        Educational
      </span>

      <span>
        <Code2 size={14} />
        Open to Experiment
      </span>
    </div>
  );
}

export function HeroButtons({
  navigate,
}: {
  navigate: (section: Section) => void;
}) {
  return (
    <div className="hero-buttons">
      <button className="button primary-button" onClick={() => navigate("games")}>
        <Play size={17} fill="currentColor" />
        Explore Games
      </button>

      <button className="button secondary-button" onClick={() => navigate("algorithms")}>
        Explore Algorithms
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function Principle({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="principle">
      <div className="principle-top">
        <span>{number}</span>
        <div className="principle-icon">{icon}</div>
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export function SectionHeader({
  kicker,
  title,
  action,
  onAction,
}: {
  kicker: string;
  title: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="section-header">
      <div>
        <div className="section-kicker">{kicker}</div>
        <h2>{title}</h2>
      </div>

      <button className="text-button" onClick={onAction}>
        {action}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function GameCard({
  game,
  index,
  onPlay,
}: {
  game: GameItem;
  index: number;
  onPlay?: () => void;
}) {
  return (
    <article className={`game-card game-card-${index}`}>
      <div className="game-art">
        <div className="game-number">0{index + 1}</div>
        <div className="game-icon">{game.icon}</div>
        <div className="game-art-grid" />
      </div>

      <div className="game-card-content">
        <div className="game-tag">{game.algorithm}</div>
        <h3>{game.title}</h3>
        <p>{game.description}</p>

        <button
          type="button"
          className="game-card-link"
          onClick={onPlay}
          disabled={!onPlay}
        >
          Play game
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

export function AlgorithmTable({
  algorithms,
}: {
  algorithms: AlgorithmItem[];
}) {
  return (
    <div className="algorithm-table">
      {algorithms.map((algorithm) => (
        <div className="algorithm-row" key={algorithm.name}>
          <span className="algorithm-category">{algorithm.category}</span>
          <strong>{algorithm.name}</strong>
          <code>{algorithm.complexity}</code>
          <ArrowRight size={17} />
        </div>
      ))}
    </div>
  );
}