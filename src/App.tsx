import { useState } from "react";

import { Navbar } from "./components/Shared";
import Algorithms from "./pages/Algorithms";
import CodeLab from "./pages/CodeLab";
import Games from "./pages/Games";
import Home from "./pages/Home";
import RecursionTree from "./pages/RecursionTree";
import CommunityWall from "./pages/CommunityWall";
import DaaAnalysis from "./pages/DaaAnalysis";
import Minesweeper from "./games/Minesweeper";
import StealthHunt from "./games/StealthHunt";
import Sudoku from "./games/Sudoku";
import TicTacToe from "./games/TicTacToe";
import type { Section } from "./data/algorithms";

import "./index.css";

export default function App() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (target: Section) => {
    setSection(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Navbar
        section={section}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
      />

      {section === "home" && <Home navigate={navigate} />}
      {section === "games" && <Games navigate={navigate} />}
      {section === "algorithms" && <Algorithms />}
      {section === "code" && <CodeLab />}
      {section === "tictactoe" && <TicTacToe />}
      {section === "sudoku" && <Sudoku />}
      {section === "minesweeper" && <Minesweeper />}
      {section === "stealth" && <StealthHunt />}
      {section === "recursion" && <RecursionTree />}
      {section === "community" && <CommunityWall />}
      {section === "analysis" && <DaaAnalysis />}

      <footer className="footer">
        <div>
          <button className="brand footer-brand" onClick={() => navigate("home")}>
            <span className="brand-mark">AG</span>

            <span>
              Algo<span className="brand-accent">Game</span>
            </span>
          </button>

          <p>Making algorithmic thinking visual, interactive and fun.</p>
        </div>

        <div className="footer-right">
          <span>DAA • Computer Science</span>
          <span>◆</span>
        </div>
      </footer>
    </div>
  );
}