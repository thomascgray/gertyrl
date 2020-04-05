<script>
  export let tile;

  let sprite;
  switch (tile.tile) {
    case "forest":
      sprite = "forest_1";
      break;
    case "town":
      sprite = "house";
      break;
    case "camp":
      sprite = "campfire";
      break;
    default:
      sprite = tile.tile;
      break;
  }
</script>

<style>
  section {
    position: absolute;
    transition: all 0.2s;
  }
  img {
    image-rendering: pixelated;
  }
</style>

<section
  style="top: {tile.position[1] * 40}px; left: {tile.position[0] * 40}px">

  <img
    title="a bandit cave"
    src="./sprites/{sprite}.png"
    width="40px"
    height="40px"
    alt="" />
</section>
