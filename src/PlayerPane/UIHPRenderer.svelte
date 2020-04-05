<script>
  export let player;

  let thirdOfMax = Math.round(player.maxHp / 3);
</script>

<section>

  <p class="font-bold uppercase">
    {#if player.currentHp <= thirdOfMax}
      <span class="text-red-500">{player.currentHp}</span>
    {/if}
    {#if player.currentHp > thirdOfMax && player.currentHp <= player.maxHp - thirdOfMax}
      <span class="text-yellow-500">{player.currentHp}</span>
    {/if}
    {#if player.currentHp > player.maxHp - thirdOfMax}
      <span class="text-green-500">{player.currentHp}</span>
    {/if}
    <span>/</span>
    <span>{player.maxHp}</span>
  </p>

</section>
