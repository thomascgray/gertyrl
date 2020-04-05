<script>
  export let player;

  import UIHPRendererSvelte from "./UIHPRenderer.svelte";
  import AttributesSvelte from "./Attributes.svelte";
</script>

<section>
  <p class="uppercase font-bold">{player.name}</p>
  <p class="uppercase font-bold">{player.race.name} {player.profession.name}</p>

  <UIHPRendererSvelte {player} />
  <AttributesSvelte {player} />

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
        <li class="flex mb-2">
          <img
            class="pixelated mr-2"
            src="./sprites/{inventoryItem.sprite}.png"
            width="32px"
            height="32px"
            alt="" />
          <span>{inventoryItem.name}</span>

        </li>
      {/each}
    </ul>
  {:else}No items{/if}
</section>
