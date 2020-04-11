import { BATTLEMAP_WIDTH, BATTLEMAP_HEIGHT, DIRECTIONS } from "./config";

export const positionsToCollisionGrid = (positions = []) => {
  let grid;

  grid = new Array(BATTLEMAP_WIDTH)
    .fill(0)
    .map(() => new Array(BATTLEMAP_HEIGHT).fill(0));

  positions.forEach((p) => {
    grid[p[1]][p[0]] = 1;
  });

  return grid;
};

export const positionsMatch = (position1, position2) => {
  return position1[0] === position2[0] && position1[1] === position2[1];
};

export const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getAttributeModifier = (val) => {
  const modifier = Math.floor((val - 5) / 2);

  return `${modifier >= 0 ? "+" : ""}${modifier}`;
};

export const directionFromPositions = (fromPosition, toPosition) => {
  if (fromPosition[0] === toPosition[0] - 1) {
    return DIRECTIONS.RIGHT;
  }
  if (fromPosition[0] === toPosition[0] + 1) {
    return DIRECTIONS.LEFT;
  }
  if (fromPosition[1] === toPosition[1] - 1) {
    return DIRECTIONS.DOWN;
  }
  if (fromPosition[1] === toPosition[1] + 1) {
    return DIRECTIONS.UP;
  }
};
