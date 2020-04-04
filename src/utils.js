import { BATTLEMAP_WIDTH, BATTLEMAP_HEIGHT } from "./config";

export const positionsToCollisionGrid = (positions = []) => {
  let grid;

  grid = new Array(BATTLEMAP_WIDTH)
    .fill(0)
    .map(() => new Array(BATTLEMAP_HEIGHT).fill(0));

  positions.forEach(p => {
    grid[p[1]][p[0]] = 1;
  });

  return grid;
};
