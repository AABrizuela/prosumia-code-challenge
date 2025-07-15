export type Coord = [number, number];
export type CellType = "" | "I" | "X" | "c";

export function isValidStart(value: string): boolean {
  if (!/^\d+,\d+$/.test(value)) {
    return false;
  }
  const [x, y] = value.split(",").map(Number);
  return x >= 0 && x < 5 && y >= 0 && y < 5;
}

export function isValidPoints(value: string): boolean {
  const pointsRegex = /^(\d+,\d+\s*;?\s*)*$/;
  if (!pointsRegex.test(value)) {
    return false;
  }
  if (!value.trim()) {
    return true;
  }
  const coords = value.split(";").map((c) => c.trim());
  const uniqueCoords = new Set(coords);
  if (uniqueCoords.size !== coords.length) {
    return false;
  }
  return coords.every((coord) => {
    if (!/^\d+,\d+$/.test(coord)) return false;
    const [x, y] = coord.split(",").map(Number);
    return x >= 0 && x < 5 && y >= 0 && y < 5;
  });
}

export function findBestRoute(
  board: string[][],
  start: Coord,
  targets: Coord[]
): Coord[] {
  const permutations = permute(targets);
  let bestPath: Coord[] = [];
  let shortestLength = Infinity;

  for (const order of permutations) {
    let path: Coord[] = [];
    let current = start;
    let valid = true;

    for (const target of order) {
      const segment = bfs(board, current, target);
      if (!segment || segment.length === 0) {
        valid = false;
        break;
      }

      if (path.length > 0) segment.shift();
      path = [...path, ...segment];
      current = target;
    }

    if (valid && path.length < shortestLength) {
      shortestLength = path.length;
      bestPath = path;
    }
  }

  return bestPath;
}

function permute<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  function backtrack(path: T[], options: T[]) {
    if (options.length === 0) {
      result.push(path);
      return;
    }

    for (let i = 0; i < options.length; i++) {
      backtrack(
        [...path, options[i]],
        [...options.slice(0, i), ...options.slice(i + 1)]
      );
    }
  }

  backtrack([], arr);
  return result;
}

function bfs(board: string[][], start: Coord, target: Coord): Coord[] {
  const numRows = board.length;
  const numCols = board[0].length;

  const visited = new Set<string>();
  const queue: { point: Coord; path: Coord[] }[] = [];

  queue.push({ point: start, path: [start] });
  visited.add(start.toString());

  const directions = Object.values(moves);

  while (queue.length > 0) {
    const { point, path } = queue.shift()!;
    const [row, col] = point;

    if (row === target[0] && col === target[1]) {
      return path;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const next: Coord = [newRow, newCol];
      const key = next.toString();

      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({ point: next, path: [...path, next] });
      }
    }
  }

  return [];
}

export const moves = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
  upLeft: [-1, -1],
  upRight: [-1, 1],
  downLeft: [1, -1],
  downRight: [1, 1],
};
