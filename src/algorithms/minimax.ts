export type TicTacToeMark = "X" | "O";

const winLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export function getWinner(board: Array<TicTacToeMark | null>) {
	for (const [a, b, c] of winLines) {
		const mark = board[a];

		if (mark && mark === board[b] && mark === board[c]) {
			return mark;
		}
	}

	return null;
}

function scoreBoard(
	board: Array<TicTacToeMark | null>,
	ai: TicTacToeMark,
	human: TicTacToeMark,
	depth: number
) {
	const winner = getWinner(board);

	if (winner === ai) {
		return 10 - depth;
	}

	if (winner === human) {
		return depth - 10;
	}

	return 0;
}

function minimax(
	board: Array<TicTacToeMark | null>,
	depth: number,
	isMaximizing: boolean,
	ai: TicTacToeMark,
	human: TicTacToeMark,
	maxDepth: number
) {
	const winner = getWinner(board);

	if (winner || board.every(Boolean) || depth >= maxDepth) {
		return scoreBoard(board, ai, human, depth);
	}

	if (isMaximizing) {
		let bestScore = -Infinity;

		for (let index = 0; index < board.length; index += 1) {
			if (board[index]) {
				continue;
			}

			board[index] = ai;
			const score = minimax(board, depth + 1, false, ai, human, maxDepth);
			board[index] = null;
			bestScore = Math.max(bestScore, score);
		}

		return bestScore;
	}

	let bestScore = Infinity;

	for (let index = 0; index < board.length; index += 1) {
		if (board[index]) {
			continue;
		}

		board[index] = human;
		const score = minimax(board, depth + 1, true, ai, human, maxDepth);
		board[index] = null;
		bestScore = Math.min(bestScore, score);
	}

	return bestScore;
}

export function findBestMove(
	board: Array<TicTacToeMark | null>,
	ai: TicTacToeMark,
	human: TicTacToeMark,
	maxDepth: number = 9
) {
	let bestScore = -Infinity;
	let bestMove = -1;

	for (let index = 0; index < board.length; index += 1) {
		if (board[index]) {
			continue;
		}

		board[index] = ai;
		const score = minimax(board, 0, false, ai, human, maxDepth);
		board[index] = null;

		if (score > bestScore) {
			bestScore = score;
			bestMove = index;
		}
	}

	return bestMove;
}
