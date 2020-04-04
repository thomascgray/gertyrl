<script>
  export let mob;

  import TileRendererSvelte from "./TileRenderer.svelte";
  $: image = mob.healthStatus === "alive" ? mob.type : "grave_cross";
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

<section style="top: {mob.position[1] * 32}px; left: {mob.position[0] * 32}px">
  <img src="./sprites/{image}.png" width="32px" height="32px" alt="" />
</section>
