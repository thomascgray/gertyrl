<script>
  export let player;
</script>

<section>
  <p>
    You are
    <strong>{player.name}</strong>
    , the
    <strong>{player.race.name}</strong>
    <strong>{player.profession.name}</strong>
  </p>

  <h4>Skills</h4>
  <ul>
    {#each player.skills as skill}
      <li>{skill}</li>
    {/each}
  </ul>

  <p>
    <strong>Inventory</strong>
  </p>
  {#if player.inventory.length >= 1}
    <ul>
      {#each player.inventory as inventoryItem}
        <li>{inventoryItem.name}</li>
      {/each}
    </ul>
  {:else}No items{/if}
</section>
