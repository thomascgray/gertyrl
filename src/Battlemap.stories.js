import { action } from "@storybook/addon-actions";

import Battlemap from "./BattleMap.svelte";
import { generate } from "./Generators/cave";

const props = {
  battlemap: generate(),
  player: undefined,
  unloadBattlemap: () => {},
  updatePlayer: () => {},
  addToLog: () => {},
};

export default {
  title: "Battlemap",
  component: Battlemap,
};

export const BattlemapStory = () => ({
  Component: Battlemap,
  props,
});
