<script>
  export let container;
  export let updatePlayer;
  export let updateContainer;
  export let handleCloseContainer;

  import ButtonSvelte from "./UI/Button.svelte";
</script>

<style>
  section {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #d1ccc0;
    padding: 16px;
    color: black;
  }
</style>

<section>
  <h3>{container.name}</h3>

  <ul>
    {#each container.items as item}
      <li>
        <ButtonSvelte
          onClick={() => {
            updatePlayer(player => {
              player.addToInventory(item);
            });
            updateContainer(container => {
              container.items.splice(container.items.indexOf(item), 1);
              return container;
            });
          }}>
          <span>
            take the
            <strong>{item.name}</strong>
          </span>
        </ButtonSvelte>
      </li>
    {/each}
  </ul>

  <ButtonSvelte
    onClick={() => {
      handleCloseContainer();
    }}>
    Close
  </ButtonSvelte>

</section>
