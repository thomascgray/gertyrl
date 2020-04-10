import { BATTLEMAP_WIDTH, BATTLEMAP_HEIGHT } from "../config";
import { rand } from "../utils";
export const generate = () => {
  const scenery = [];
  const mobs = [];
  const props = [];

  for (let x = 0; x < BATTLEMAP_WIDTH; x++) {
    for (let y = 0; y < BATTLEMAP_HEIGHT; y++) {
      if (x === 0) {
        scenery.push([[x, y], "filled_stone_1"]);
      }
      if (y === 0) {
        scenery.push([[x, y], "filled_stone_1"]);
      }
      if (x === BATTLEMAP_WIDTH - 1) {
        scenery.push([[x, y], "filled_stone_1"]);
      }
      if (y === BATTLEMAP_HEIGHT - 1) {
        scenery.push([[x, y], "filled_stone_1"]);
      }
    }
  }

  props.push({
    uuid: "stairs up",
    name: "stairs up",
    type: "stairs_up",
    tile: "stairs_up",
    position: [rand(1, BATTLEMAP_WIDTH - 2), rand(1, BATTLEMAP_HEIGHT - 2)],
  });

  console.log("props", props);

  return {
    scenery,
    mobs,
    props,
  };
};
