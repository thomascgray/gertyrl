<script>
  export let scenery;
</script>

<style>
  section {
    position: absolute;
  }
  img {
    image-rendering: pixelated;
  }
</style>

<section
  data-position-x={scenery[0][0]}
  data-position-y={scenery[0][1]}
  style="top: {scenery[0][1] * 40}px; left: {scenery[0][0] * 40}px">
  <img src="./sprites/{scenery[1]}.png" width="40px" height="40px" alt="" />
</section>
