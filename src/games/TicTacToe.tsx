import { useEffect, useMemo, useState } from "react";
import { findBestMove, getWinner, type TicTacToeMark } from "../algorithms/minimax";

type Cell = TicTacToeMark | null;
type Difficulty = "easy" | "medium" | "hard";

const human: TicTacToeMark = "X";
const ai: TicTacToeMark = "O";

const winningLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function createBoard() {
	return Array<Cell>(9).fill(null);
}

export default function TicTacToe() {
	const [board, setBoard] = useState<Cell[]>(createBoard);
	const [difficulty, setDifficulty] = useState<Difficulty>("hard");
	const [round, setRound] = useState(1);

	const winner = useMemo(() => getWinner(board), [board]);
	const winningLine = useMemo(() => {
		if (!winner) {
			return [];
		}

		return winningLines.find(([a, b, c]) => board[a] === winner && board[b] === winner && board[c] === winner) ?? [];
	}, [board, winner]);

	const isDraw = !winner && board.every(Boolean);

	const status = useMemo(() => {
		if (winner) {
			return winner === human ? "You won this round" : "The AI won this round";
		}

		if (isDraw) {
			return "Draw - both players exhausted their options";
		}

		const humanCount = board.filter((mark) => mark === human).length;
		const aiCount = board.filter((mark) => mark === ai).length;

		return aiCount > humanCount ? "AI is thinking" : "Your move";
	}, [board, isDraw, winner]);

	useEffect(() => {
		if (winner || isDraw) {
			return;
		}

		const humanCount = board.filter((mark) => mark === human).length;
		const aiCount = board.filter((mark) => mark === ai).length;

		if (humanCount <= aiCount) {
			return;
		}

		const timer = window.setTimeout(() => {
			let move = -1;

			if (difficulty === "easy") {
				// 50% chance of random move, 50% chance of depth 1 minimax
				if (Math.random() < 0.5) {
					const available: number[] = [];
					board.forEach((cell, idx) => {
						if (!cell) available.push(idx);
					});
					if (available.length > 0) {
						move = available[Math.floor(Math.random() * available.length)];
					}
				} else {
					move = findBestMove([...board], ai, human, 1);
				}
			} else if (difficulty === "medium") {
				// Depth 2 minimax
				move = findBestMove([...board], ai, human, 2);
			} else {
				// Full Depth 9 unbeatable minimax
				move = findBestMove([...board], ai, human, 9);
			}

			if (move === -1) {
				return;
			}

			setBoard((current) => {
				if (current[move]) {
					return current;
				}

				const next = [...current];
				next[move] = ai;
				return next;
			});

			setRound((value) => value + 1);
		}, 300);

		return () => window.clearTimeout(timer);
	}, [board, isDraw, winner, difficulty]);

	function handleCellClick(index: number) {
		if (board[index] || winner || isDraw) {
			return;
		}

		const next = [...board];
		next[index] = human;
		setBoard(next);
	}

	function reset() {
		setBoard(createBoard());
		setRound(1);
	}

	return (
		<main className="game-page tictactoe-page">
			<section className="game-hero">
				<div>
					<div className="section-kicker">GAME MODULE 01</div>
					<h1>
						Tic-Tac-Toe
						<br />
						<span>with Minimax AI.</span>
					</h1>
					<p>
						Play against an AI that evaluates future moves. Select different difficulty configurations to bound the AI's search depth.
					</p>
				</div>

				<div className="game-hero-panel">
					<span>STATUS</span>
					<strong>{status}</strong>
					<p>Round {round}. Human plays X, AI plays O.</p>
					<button className="button primary-button" style={{ width: "100%", marginTop: "10px" }} onClick={reset}>Reset board</button>
				</div>
			</section>

			{/* Difficulty Selectors */}
			<section className="games-page-actions" style={{ background: "var(--panel)", padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "20px" }}>
				<div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
					<div>
						<label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>AI DIFFICULTY</label>
						<div style={{ display: "flex", gap: "6px" }}>
							{(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
								<button
									key={diff}
									className={`button ${difficulty === diff ? "primary-button" : "secondary-button"}`}
									style={{ minHeight: "36px", textTransform: "uppercase" }}
									onClick={() => { setDifficulty(diff); reset(); }}
								>
									{diff === "easy" ? "Easy (Depth 1)" : diff === "medium" ? "Medium (Depth 2)" : "Hard (Unbeatable)"}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="tictactoe-layout">
				<div className="tictactoe-board" role="grid" aria-label="Tic tac toe board">
					{board.map((cell, index) => (
						<button
							key={index}
							className={winningLine.includes(index) ? "tictactoe-cell winning" : "tictactoe-cell"}
							onClick={() => handleCellClick(index)}
							disabled={Boolean(cell) || Boolean(winner) || isDraw}
							style={{
								boxShadow: cell === human ? "0 0 10px var(--accent)" : cell === ai ? "0 0 10px var(--danger)" : undefined,
								borderColor: cell === human ? "var(--accent)" : cell === ai ? "var(--danger)" : undefined
							}}
						>
							{cell}
						</button>
					))}
				</div>

				<aside className="game-sidecard">
					<div className="section-kicker">MINIMAX</div>
					<h2>Every move is scored before it is played.</h2>
					<p>
						The AI recursively explores future turns, assumes perfect play on both sides, and picks the move that maximizes its outcome.
					</p>

					<div className="game-side-stats">
						<div>
							<span>AI Depth Limit</span>
							<strong style={{ color: "var(--accent)", textTransform: "uppercase" }}>{difficulty}</strong>
						</div>
						<div>
							<span>Human</span>
							<strong>X</strong>
						</div>
						<div>
							<span>State</span>
							<strong>{winner ? `${winner} wins` : isDraw ? "Draw" : "Open"}</strong>
						</div>
					</div>
				</aside>
			</section>

			<section className="game-learning">
				<div className="learning-header">
					<div className="section-kicker">ALGORITHM NOTES</div>
					<h2>Minimax decision flow</h2>
				</div>

				<div className="learning-grid">
					<div className="learning-code">
						<pre>{`score(board):
  if winner is AI: return 10 - depth
  if winner is human: return depth - 10
  return 0

minimax(board, depth, isMax):
  if terminal state or depth >= maxDepth: 
    return score(board)
  if isMax:
    return max(moveScore)
  else:
    return min(moveScore)`}</pre>
					</div>

					<div className="learning-steps">
						<h3>Student guide</h3>
						<ol>
							<li>Compare how depth bounds affect the AI performance. Easy mode only evaluates 1 step ahead.</li>
							<li>Observe how Medium blocks immediate wins but fails to foresee long-term traps.</li>
							<li>Try beating the Hard mode (it's mathematically impossible to win if you play second!).</li>
						</ol>
					</div>
				</div>
			</section>
		</main>
	);
}
