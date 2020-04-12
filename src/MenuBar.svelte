<script>
  export let openModal;
</script>

<style>
  img {
    image-rendering: pixelated;
  }
</style>

<section>

  <button
    on:click={() => openModal('character')}
    class="inline-block w-24 bg-gray-600 mr-2 mb-2 p-2 text-center">
    <img
      class="m-auto"
      src="./sprites/man_alt.png"
      width="40px"
      height="40px"
      alt="" />
    <span>Character</span>
  </button>
  <button
    on:click={() => openModal('inventory')}
    class="inline-block w-24 bg-gray-600 mr-2 mb-2 p-2 text-center">
    <img
      class="m-auto"
      src="./sprites/sack.png"
      width="40px"
      height="40px"
      alt="" />
    <span>Inventory</span>
  </button>
  <button
    on:click={() => openModal('quests')}
    class="inline-block w-24 bg-gray-600 mr-2 mb-2 p-2 text-center">
    <img
      class="m-auto"
      src="./sprites/exclamation.png"
      width="40px"
      height="40px"
      alt="" />
    <span>Quests</span>
  </button>

  <button
    on:click={() => openModal('factions')}
    class="inline-block w-24 bg-gray-600 mr-2 mb-2 p-2 text-center">
    <img
      class="m-auto"
      src="./sprites/shield_red.png"
      width="40px"
      height="40px"
      alt="" />
    <span>Factions</span>
  </button>

</section>
