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

<section style="top: {scenery[0][1] * 32}px; left: {scenery[0][0] * 32}px">

  <img src="./sprites/{scenery[1]}.png" width="32px" height="32px" alt="" />

</section>
