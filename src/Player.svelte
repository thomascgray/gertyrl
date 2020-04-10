<script>
  export let player;
  export let isWorld = false;
</script>

<style>
  div {
    position: absolute;
    transition: all 0.2s;
  }
  img {
    image-rendering: pixelated;
  }
</style>

<div
  data-id="player-div"
  style="top: {isWorld ? player.worldPosition[1] * 40 : player.position[1] * 40}px;
  left: {isWorld ? player.worldPosition[0] * 40 : player.position[0] * 40}px"
  class="player-tile">
  <img
    data-id="player"
    src="./sprites/man.png"
    width="40px"
    height="40px"
    alt="" />
</div>
