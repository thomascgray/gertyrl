<script>
  export let closeModal;
  export let player;
</script>

<section class="bg-gray-800 text-gray-100 p-2">
  <div class="flex justify-between">
    <label class="uppercase font-bold">character</label>
    <button on:click={() => closeModal()}>close</button>
  </div>

</section>
