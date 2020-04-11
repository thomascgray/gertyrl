import { action } from "@storybook/addon-actions";
import { positionsToCollisionGrid } from "../utils";
import Battlemap from "../BattleMap.svelte";
import { generate } from "../Generators/cave";

export default {
  title: "Battlemap",
  component: Battlemap,
};

const propsCave = {
  battlemap: generate(),
  player: undefined,
  unloadBattlemap: () => {},
  updatePlayer: () => {},
  addToLog: () => {},
};

export const BattlemapCave = () => ({
  Component: Battlemap,
  props: propsCave,
});

const propsPathfinding = {
  battlemap: {
    collisionGrid: positionsToCollisionGrid([]),
    props: [],
    scenery: [],
    mobs: [
      {
        uuid: "bandit2",
        name: "a bandit",
        type: "man_2",
        healthStatus: "alive",
        position: [1, 1],
        path: undefined,
      },
    ],
  },
  player: {
    position: [10, 10],
  },
  unloadBattlemap: () => {},
  updatePlayer: () => {},
  addToLog: () => {},
};

export const BattlemapPathfindingTest = () => ({
  Component: Battlemap,
  props: propsPathfinding,
});
