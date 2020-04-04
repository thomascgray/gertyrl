import _ from "lodash";
import { positionsToCollisionGrid } from "./utils";
export const init = () => {
  localStorage.clear();

  const settlements = [
    {
      uuid: "Liverpool",
      name: "Liverpool",
      tile: "town",
      position: [4, 4],
      items: []
    },
    {
      uuid: "Chesterfield",
      name: "Chesterfield",
      tile: "town",
      position: [1, 10],
      items: []
    },
    {
      uuid: "Bandit Camp",
      name: "Bandit Camp",
      tile: "camp",
      position: [3, 7],
      items: [],
      battlemapUuid: "Bandit Camp"
    },
    {
      uuid: "Cave",
      name: "Cave",
      tile: "cave",
      position: [7, 8],
      items: [],
      battlemapUuid: "Cave"
    }
  ];

  const worldScenery = [
    [[0, 0], "forest_1"],
    [[0, 1], "forest_2"],
    [[7, 9], "mountain"],
    [[7, 7], "mountain"],
    [[9, 8], "mountain"],
    [[8, 8], "mountain"]
  ];

  let battlemaps = [
    {
      uuid: "Cave",
      name: "a cave",
      description: "A damp cave",
      mobs: [],
      props: [
        {
          uuid: "rustychest1",
          name: "Rusty Chest",
          type: "container",
          items: [
            {
              name: "Short Sword",
              damage: "1d6"
            }
          ],
          tile: "chest",
          position: [1, 1]
        },
        {
          uuid: "stairs up",
          name: "stairs up",
          type: "stairs_up",
          tile: "stairs_up",
          position: [6, 3]
        }
      ],
      scenery: [
        [[0, 0], "filled_stone_1"],
        [[0, 1], "filled_stone_1"],
        [[0, 2], "filled_stone_1"],
        [[0, 3], "filled_stone_1"],
        [[0, 4], "filled_stone_1"],
        [[0, 5], "filled_stone_1"],
        [[0, 6], "filled_stone_1"],
        [[0, 7], "filled_stone_1"],
        [[7, 0], "filled_stone_1"],
        [[7, 1], "filled_stone_1"],
        [[7, 2], "filled_stone_1"],
        [[7, 3], "filled_stone_1"],
        [[7, 4], "filled_stone_1"],
        [[7, 5], "filled_stone_1"],
        [[7, 6], "filled_stone_1"],
        [[7, 7], "filled_stone_1"],
        [[0, 0], "filled_stone_1"],
        [[1, 0], "filled_stone_1"],
        [[2, 0], "filled_stone_1"],
        [[3, 0], "filled_stone_1"],
        [[4, 0], "filled_stone_1"],
        [[5, 0], "filled_stone_1"],
        [[6, 0], "filled_stone_1"],
        [[7, 0], "filled_stone_1"],
        [[0, 7], "filled_stone_1"],
        [[1, 7], "filled_stone_1"],
        [[2, 7], "filled_stone_1"],
        [[3, 7], "filled_stone_1"],
        [[4, 7], "filled_stone_1"],
        [[5, 7], "filled_stone_1"],
        [[6, 7], "filled_stone_1"],
        [[7, 7], "filled_stone_1"]
      ]
    },
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
          position: [6, 3]
        }
      ],
      mobs: [
        // {
        //   uuid: "bandit1",
        //   name: "a bandit",
        //   type: "man_2",
        //   hp: 12,
        //   healthStatus: "alive",
        //   items: [{ name: "sword" }, { name: "shield" }],
        //   position: [7, 6]
        // },
        {
          uuid: "bandit2",
          name: "a bandit",
          type: "man_2",
          hp: 5,
          healthStatus: "alive",
          items: [{ name: "Sword" }, { name: "Shield" }, { name: "Egg" }],
          position: [1, 5]
        }
      ]
    }
  ];

  // generate the collision grids for the battlemaps
  battlemaps = battlemaps.map(battlemap => {
    const positions = [
      ...battlemap.props.map(x => x.position),
      ...battlemap.mobs.map(x => x.position)
    ];

    battlemap.collisionGrid = positionsToCollisionGrid(positions);

    return battlemap;
  });

  settlements.forEach(set => {
    localStorage.setItem(`settlement_${set.uuid}`, JSON.stringify(set));
  });

  battlemaps.forEach(battlemap => {
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
  const localStorageKeys = Object.keys(localStorage);

  const values = localStorageKeys
    .filter(lsk => lsk.startsWith("settlement_"))
    .map(lsk => JSON.parse(localStorage.getItem(lsk)));
  return values;
};

export const updateSettlement = (settlementUuid, callback) => {
  const settlement = fetchSettlement(settlementUuid);
  const newSettlement = callback(_.cloneDeep(settlement));

  localStorage.setItem(
    `settlement_${settlementUuid}`,
    JSON.stringify(newSettlement)
  );

  return newSettlement;
};

export const fetchSettlement = settlementUuid => {
  return JSON.parse(localStorage.getItem(`settlement_${settlementUuid}`));
};

export const updateBattlemap = (battlemapUuid, callback) => {
  const battlemap = loadBattlemap(battlemapUuid);
  const newBattlemap = callback(_.cloneDeep(battlemap));

  localStorage.setItem(
    `battlemap_${battlemapUuid}`,
    JSON.stringify(newBattlemap)
  );

  return newBattlemap;
};

export const saveBattlemap = battlemap => {
  localStorage.setItem(
    `battlemap_${battlemap.uuid}`,
    JSON.stringify(battlemap)
  );
};

export const loadBattlemap = battlemapUuid => {
  return JSON.parse(localStorage.getItem(`battlemap_${battlemapUuid}`));
};

export const getWorldScenery = () => {
  const localStorageKeys = Object.keys(localStorage);

  const values = localStorageKeys
    .filter(lsk => lsk.startsWith("worldScenery_"))
    .map(lsk => JSON.parse(localStorage.getItem(lsk)));
  return values;
};
