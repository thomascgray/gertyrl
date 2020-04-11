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
        type: "zombie",
        healthStatus: "alive",
        position: [1, 1],
      },
    ],
  },
  player: {
    position: [3, 1],
  },
  unloadBattlemap: () => {},
  updatePlayer: () => {},
  addToLog: () => {},
};

export const BattlemapPathfinding = () => ({
  Component: Battlemap,
  props: propsPathfinding,
});

const propsPathfindingMultipleMobs = {
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
        position: [5, 5],
      },
      {
        uuid: "bandit24",
        name: "a bandit",
        type: "man_2",
        healthStatus: "alive",
        position: [6, 4],
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

export const BattlemapPathfindingMultipleMobs = () => ({
  Component: Battlemap,
  props: propsPathfindingMultipleMobs,
});

const propsPathfindingThreeMobs = {
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
        position: [5, 5],
      },
      {
        uuid: "bandit24",
        name: "a bandit",
        type: "man_2",
        healthStatus: "alive",
        position: [6, 4],
      },
      {
        uuid: "bandit244",
        name: "a bandit",
        type: "man_2",
        healthStatus: "alive",
        position: [3, 10],
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

export const BattlemapPathfindingThreeMobs = () => ({
  Component: Battlemap,
  props: propsPathfindingThreeMobs,
});
