import { GameCard, SectionHeader } from "../components/Shared";
import { games, type Section } from "../data/algorithms";

export default function Games({
  navigate,
}: {
  navigate: (section: Section) => void;
}) {
  return (
    <main className="games-page">
      <section className="games-hero">
        <div>
          <div className="section-kicker">GAME LIBRARY</div>

          <h1>
            Algorithmic games,
            <br />
            <span>built to teach.</span>
          </h1>

          <p>
            Every game in AlgoGame is an interface for an algorithmic idea. The goal
            is not entertainment for its own sake, but to make decision-making,
            search, and optimization visible.
          </p>
        </div>

        <div className="games-hero-panel">
          <span>START HERE</span>
          <strong>Tic-Tac-Toe AI</strong>
          <p>Play the first complete module and watch Minimax choose perfect moves.</p>
          <button className="button primary-button" onClick={() => navigate("tictactoe")}>Explore games</button>
        </div>
      </section>

      <div className="games-page-actions">
        <button className="button secondary-button" onClick={() => navigate("home")}>Back to home</button>
        <button className="button primary-button" onClick={() => navigate("algorithms")}>Explore algorithms</button>
      </div>

      <section className="games-section games-section-surface">
        <SectionHeader
          kicker="INTERACTIVE MODULES"
          title="Each experience teaches a different algorithmic idea."
          action="Open algorithms"
          onAction={() => navigate("algorithms")}
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
    </main>
  );
}