import _ from "lodash";
import { positionsToCollisionGrid } from "./utils";
import { generate } from "./Generators/cave";
export const init = () => {
  localStorage.clear();

  const settlements = [
    {
      uuid: "Liverpool",
      name: "Liverpool",
      tile: "town",
      position: [4, 4],
      items: [],
    },
    {
      uuid: "Chesterfield",
      name: "Chesterfield",
      tile: "town",
      position: [1, 10],
      items: [],
    },
    {
      uuid: "Bandit Camp",
      name: "Bandit Camp",
      tile: "camp",
      position: [3, 7],
      items: [],
      battlemapUuid: "Bandit Camp",
    },
    {
      uuid: "Cave",
      name: "Cave",
      tile: "cave",
      position: [7, 8],
      items: [],
      battlemapUuid: "cave_entrance",
    },
  ];

  const worldScenery = [
    [[0, 0], "forest_1", "forest"],
    [[0, 1], "forest_2", "forest"],
    [[0, 1], "forest_1", "forest"],
    [[5, 7], "forest_2", "forest"],
    [[4, 6], "forest_1", "forest"],
    [[5, 6], "forest_2", "forest"],
    [[0, 1], "forest_1", "forest"],
    [[7, 9], "mountain", "mountain"],
    [[7, 7], "mountain", "mountain"],
    [[9, 8], "mountain", "mountain"],
    [[8, 8], "mountain", "mountain"],
  ];

  let battlemaps = [
    {
      uuid: "Bandit Camp",
      name: "a bandit camp",
      description: "its a bandit camp",
      props: [
        {
          uuid: "signpost",
          name: "signpost",
          type: "stairs_up",
          tile: "signpost",
          position: [6, 3],
        },
      ],
      mobs: [
        {
          uuid: "bandit2",
          name: "a bandit",
          type: "man_2",
          hp: 5,
          healthStatus: "alive",
          items: [
            { name: "Sword", sprite: "sword" },
            { name: "Shield", sprite: "shield" },
            { name: "Egg" },
          ],
          position: [1, 5],
        },
      ],
    },
    {
      uuid: "cave_entrance",
      name: "cave",
      description: "a cave",
      scenery: [
        [[0, 0], "filled_stone_1"],
        [[0, 0], "filled_stone_1"],
        [[0, 1], "filled_stone_1"],
        [[0, 2], "filled_stone_1"],
        [[0, 3], "filled_stone_1"],
        [[0, 4], "filled_stone_1"],
        [[0, 5], "filled_stone_1"],
        // [[0, 6], "filled_stone_1"],
        [[0, 7], "filled_stone_1"],
        [[0, 8], "filled_stone_1"],
        [[0, 9], "filled_stone_1"],
        [[0, 10], "filled_stone_1"],
        [[0, 11], "filled_stone_1"],
        [[0, 11], "filled_stone_1"],
        [[1, 0], "filled_stone_1"],
        [[1, 11], "filled_stone_1"],
        [[2, 0], "filled_stone_1"],
        [[2, 11], "filled_stone_1"],
        [[3, 0], "filled_stone_1"],
        [[3, 11], "filled_stone_1"],
        [[4, 0], "filled_stone_1"],
        [[4, 11], "filled_stone_1"],
        [[5, 0], "filled_stone_1"],
        [[5, 11], "filled_stone_1"],
        [[6, 0], "filled_stone_1"],
        [[6, 11], "filled_stone_1"],
        [[7, 0], "filled_stone_1"],
        [[7, 11], "filled_stone_1"],
        [[8, 0], "filled_stone_1"],
        [[8, 11], "filled_stone_1"],
        [[9, 0], "filled_stone_1"],
        [[9, 11], "filled_stone_1"],
        [[10, 0], "filled_stone_1"],
        [[10, 11], "filled_stone_1"],
        [[11, 0], "filled_stone_1"],
        [[11, 0], "filled_stone_1"],
        [[11, 1], "filled_stone_1"],
        [[11, 2], "filled_stone_1"],
        [[11, 3], "filled_stone_1"],
        [[11, 4], "filled_stone_1"],
        [[11, 5], "filled_stone_1"],
        [[11, 6], "filled_stone_1"],
        [[11, 7], "filled_stone_1"],
        [[11, 8], "filled_stone_1"],
        [[11, 9], "filled_stone_1"],
        [[11, 10], "filled_stone_1"],
        [[11, 11], "filled_stone_1"],
        [[11, 11], "filled_stone_1"],
      ],
      mobs: [],
      props: [
        {
          uuid: "cave_entrance_stairs_up",
          name: "stairs up",
          type: "stairs_up",
          tile: "stairs_up",
          position: [9, 9],
        },
        {
          uuid: "cave_entrance_stairs_up",
          name: "door",
          type: "door",
          travel_to: "cave_room_2",
          tile: "stone_door",
          position: [0, 6],
          new_player_position: [10, 6],
        },
      ],
    },
    {
      uuid: "cave_room_2",
      name: "cave",
      description: "a cave",
      scenery: [
        [[0, 0], "filled_stone_1"],
        [[0, 0], "filled_stone_1"],
        [[0, 1], "filled_stone_1"],
        [[0, 2], "filled_stone_1"],
        [[0, 3], "filled_stone_1"],
        [[0, 4], "filled_stone_1"],
        [[0, 5], "filled_stone_1"],
        [[0, 6], "filled_stone_1"],
        [[0, 7], "filled_stone_1"],
        [[0, 8], "filled_stone_1"],
        [[0, 9], "filled_stone_1"],
        [[0, 10], "filled_stone_1"],
        [[0, 11], "filled_stone_1"],
        [[0, 11], "filled_stone_1"],
        [[1, 0], "filled_stone_1"],
        [[1, 11], "filled_stone_1"],
        [[2, 0], "filled_stone_1"],
        [[2, 11], "filled_stone_1"],
        [[3, 0], "filled_stone_1"],
        [[3, 11], "filled_stone_1"],
        [[4, 0], "filled_stone_1"],
        [[4, 11], "filled_stone_1"],
        [[5, 0], "filled_stone_1"],
        [[5, 11], "filled_stone_1"],
        [[6, 0], "filled_stone_1"],
        [[6, 11], "filled_stone_1"],
        [[7, 0], "filled_stone_1"],
        [[7, 11], "filled_stone_1"],
        [[8, 0], "filled_stone_1"],
        [[8, 11], "filled_stone_1"],
        [[9, 0], "filled_stone_1"],
        [[9, 11], "filled_stone_1"],
        [[10, 0], "filled_stone_1"],
        [[10, 11], "filled_stone_1"],
        [[11, 0], "filled_stone_1"],
        [[11, 0], "filled_stone_1"],
        [[11, 1], "filled_stone_1"],
        [[11, 2], "filled_stone_1"],
        [[11, 3], "filled_stone_1"],
        [[11, 4], "filled_stone_1"],
        [[11, 5], "filled_stone_1"],
        // [[11, 6], "filled_stone_1"],
        [[11, 7], "filled_stone_1"],
        [[11, 8], "filled_stone_1"],
        [[11, 9], "filled_stone_1"],
        [[11, 10], "filled_stone_1"],
        [[11, 11], "filled_stone_1"],
        [[11, 11], "filled_stone_1"],
      ],
      mobs: [],
      props: [
        {
          uuid: "cave_room_2_door_to_entrance",
          name: "door",
          type: "door",
          travel_to: "cave_entrance",
          tile: "stone_door",
          position: [11, 6],
          new_player_position: [1, 6],
        },
      ],
    },
  ];

  // generate the collision grids for the battlemaps
  battlemaps = battlemaps.map((battlemap) => {
    const positions = [
      ...battlemap.props.map((x) => x.position),
      ...battlemap.mobs.map((x) => x.position),
    ];

    battlemap.collisionGrid = positionsToCollisionGrid(positions);

    return battlemap;
  });

  settlements.forEach((set) => {
    localStorage.setItem(`settlement_${set.uuid}`, JSON.stringify(set));
  });

  battlemaps.forEach((battlemap) => {
    localStorage.setItem(
      `battlemap_${battlemap.uuid}`,
      JSON.stringify(battlemap)
    );
  });

  worldScenery.forEach((ws, wsi) => {
    localStorage.setItem(`worldScenery_${wsi}_${ws[1]}`, JSON.stringify(ws));
  });
};

export const getSettlements = () => {
  console.log("LOCAL STORAGE ACCESS getSettlements()");

  const localStorageKeys = Object.keys(localStorage);

  const values = localStorageKeys
    .filter((lsk) => lsk.startsWith("settlement_"))
    .map((lsk) => JSON.parse(localStorage.getItem(lsk)));
  return values;
};

export const updateSettlement = (settlementUuid, callback) => {
  const settlement = fetchSettlement(settlementUuid);
  const newSettlement = callback(_.cloneDeep(settlement));
  console.log("LOCAL STORAGE ACCESS updateSettlement()");

  localStorage.setItem(
    `settlement_${settlementUuid}`,
    JSON.stringify(newSettlement)
  );

  return newSettlement;
};

export const fetchSettlement = (settlementUuid) => {
  console.log("LOCAL STORAGE ACCESS fetchSettlement()");

  return JSON.parse(localStorage.getItem(`settlement_${settlementUuid}`));
};

export const updateBattlemap = (battlemapUuid, callback) => {
  console.log("LOCAL STORAGE ACCESS updateBattlemap()");

  const battlemap = loadBattlemap(battlemapUuid);
  const newBattlemap = callback(_.cloneDeep(battlemap));

  localStorage.setItem(
    `battlemap_${battlemapUuid}`,
    JSON.stringify(newBattlemap)
  );

  return newBattlemap;
};

export const saveBattlemap = (battlemap) => {
  console.log("LOCAL STORAGE ACCESS saveBattlemap()");

  localStorage.setItem(
    `battlemap_${battlemap.uuid}`,
    JSON.stringify(battlemap)
  );
};

export const loadBattlemap = (battlemapUuid) => {
  console.log("LOCAL STORAGE ACCESS loadBattlemap()");

  return JSON.parse(localStorage.getItem(`battlemap_${battlemapUuid}`));
};

export const getWorldScenery = () => {
  const localStorageKeys = Object.keys(localStorage);
  console.log("LOCAL STORAGE ACCESS getWorldScenery()");

  const values = localStorageKeys
    .filter((lsk) => lsk.startsWith("worldScenery_"))
    .map((lsk) => JSON.parse(localStorage.getItem(lsk)));
  return values;
};
