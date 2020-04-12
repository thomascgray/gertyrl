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

</section>
