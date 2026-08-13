export type GridPoint = {
  x: number;
  y: number;
};

export type PathfindResult = {
  path: GridPoint[];
  explored: GridPoint[];
};

function keyOf(point: GridPoint) {
  return `${point.x},${point.y}`;
}

export function findPath(
  start: GridPoint,
  end: GridPoint,
  walls: Set<string>,
  width: number,
  height: number,
  algorithm: "bfs" | "dfs" | "astar" = "bfs"
): PathfindResult {
  if (
    start.x < 0 ||
    start.y < 0 ||
    end.x < 0 ||
    end.y < 0 ||
    start.x >= width ||
    start.y >= height ||
    end.x >= width ||
    end.y >= height
  ) {
    return { path: [], explored: [] };
  }

  const explored: GridPoint[] = [];
  const visited = new Set<string>([keyOf(start)]);
  const previous = new Map<string, GridPoint | null>([[keyOf(start), null]]);

  // BFS implementation
  if (algorithm === "bfs") {
    const queue: GridPoint[] = [start];
    while (queue.length > 0) {
      const current = queue.shift()!;
      explored.push(current);

      if (current.x === end.x && current.y === end.y) break;

      const neighbors: GridPoint[] = [
        { x: current.x, y: current.y - 1 }, // Up
        { x: current.x + 1, y: current.y }, // Right
        { x: current.x, y: current.y + 1 }, // Down
        { x: current.x - 1, y: current.y }, // Left
      ];

      for (const neighbor of neighbors) {
        const key = keyOf(neighbor);
        if (
          neighbor.x >= 0 &&
          neighbor.y >= 0 &&
          neighbor.x < width &&
          neighbor.y < height &&
          !walls.has(key) &&
          !visited.has(key)
        ) {
          visited.add(key);
          previous.set(key, current);
          queue.push(neighbor);
        }
      }
    }
  }

  // DFS implementation
  else if (algorithm === "dfs") {
    const stack: GridPoint[] = [start];
    // Keep track of visited nodes using set
    const dfsVisited = new Set<string>([keyOf(start)]);

    while (stack.length > 0) {
      const current = stack.pop()!;
      explored.push(current);

      if (current.x === end.x && current.y === end.y) break;

      const neighbors: GridPoint[] = [
        { x: current.x - 1, y: current.y }, // Left
        { x: current.x, y: current.y + 1 }, // Down
        { x: current.x + 1, y: current.y }, // Right
        { x: current.x, y: current.y - 1 }, // Up
      ];

      for (const neighbor of neighbors) {
        const key = keyOf(neighbor);
        if (
          neighbor.x >= 0 &&
          neighbor.y >= 0 &&
          neighbor.x < width &&
          neighbor.y < height &&
          !walls.has(key) &&
          !dfsVisited.has(key)
        ) {
          dfsVisited.add(key);
          previous.set(key, current);
          stack.push(neighbor);
        }
      }
    }
  }

  // A* Search implementation (using Manhattan distance heuristic)
  else if (algorithm === "astar") {
    const openSet: GridPoint[] = [start];
    const gScore = new Map<string, number>([[keyOf(start), 0]]);
    const fScore = new Map<string, number>([[keyOf(start), Math.abs(start.x - end.x) + Math.abs(start.y - end.y)]]);

    while (openSet.length > 0) {
      // Sort openSet by fScore
      openSet.sort((a, b) => {
        const fa = fScore.get(keyOf(a)) ?? Infinity;
        const fb = fScore.get(keyOf(b)) ?? Infinity;
        return fa - fb;
      });

      const current = openSet.shift()!;
      explored.push(current);

      if (current.x === end.x && current.y === end.y) break;

      const neighbors: GridPoint[] = [
        { x: current.x, y: current.y - 1 },
        { x: current.x + 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x - 1, y: current.y },
      ];

      for (const neighbor of neighbors) {
        const key = keyOf(neighbor);
        if (
          neighbor.x < 0 ||
          neighbor.y < 0 ||
          neighbor.x >= width ||
          neighbor.y >= height ||
          walls.has(key)
        ) {
          continue;
        }

        const tentativeGScore = (gScore.get(keyOf(current)) ?? Infinity) + 1;

        if (tentativeGScore < (gScore.get(key) ?? Infinity)) {
          previous.set(key, current);
          gScore.set(key, tentativeGScore);
          fScore.set(key, tentativeGScore + Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y));

          if (!openSet.some(p => p.x === neighbor.x && p.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  }

  const path: GridPoint[] = [];

  // Check if target was reached in our traversal tree
  let reached = false;
  for (const exp of explored) {
    if (exp.x === end.x && exp.y === end.y) {
      reached = true;
      break;
    }
  }

  if (reached) {
    let cursor: GridPoint | null = end;
    while (cursor) {
      path.push(cursor);
      cursor = previous.get(keyOf(cursor)) ?? null;
    }
    path.reverse();
  }

  return { path, explored };
}
