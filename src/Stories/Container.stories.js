import { action } from "@storybook/addon-actions";

import Container from "../Container.svelte";

const props = {
  container: {
    uuid: "rustychest1",
    name: "Rusty Chest",
    type: "container",
    items: [
      {
        name: "Short Sword",
        damage: "1d6",
        sprite: "sword",
      },
      {
        name: "Axe",
        damage: "1d6",
        sprite: "sword",
      },
      {
        name: "Iron Helment",
        damage: "1d6",
        sprite: "sword",
      },
    ],
    tile: "chest",
    position: [6, 6],
  },
  updatePlayer: () => {
    action("updatePlayer");
  },
  updateContainer: () => {
    action("updateContainer");
  },
  handleCloseContainer: () => {},
};

// const Wrapper =

export default {
  title: "Container",
  component: Container,
};

export const BaseContainer = () => ({
  Component: Container,
  props,
});
