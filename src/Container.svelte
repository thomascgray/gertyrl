<script>
  export let container;
  export let updatePlayer;
  export let updateContainer;
  export let handleCloseContainer;

  import { onMount } from "svelte";
  import ButtonSvelte from "./GenericUI/Button.svelte";

  let itemCursorPosition = 0;

  const handleKeyDown = e => {
    e.preventDefault();
    e.stopPropagation();

    switch (e.key) {
      case "s":
        itemCursorPosition = itemCursorPosition + 1;
        if (itemCursorPosition >= container.items.length) {
          itemCursorPosition = 0;
        }
        break;
      case "w":
        itemCursorPosition = itemCursorPosition - 1;
        if (itemCursorPosition < 0) {
          itemCursorPosition = container.items.length - 1;
        }
        break;
      case "Enter":
        const item = container.items[itemCursorPosition];
        takeItem(item);
        break;
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  const takeItem = item => {
    updatePlayer(player => {
      player.addToInventory(item);
    });
    updateContainer(container => {
      container.items.splice(container.items.indexOf(item), 1);
      return container;
    });
  };
</script>

<style>
  section {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 460px;
    width: 460px;
    background: #d1ccc0;
    padding: 16px;
    color: black;
  }
</style>

<section class="container-interface">
  <h3>{container.name}</h3>

  <ul>
    {#each container.items as item, itemIndex}
      <li>
        {#if itemCursorPosition === itemIndex}
          <span class="w-5 inline-block">></span>
        {/if}
        <ButtonSvelte
          className="p-2 {itemCursorPosition !== itemIndex ? 'ml-6' : ''}"
          onClick={() => {
            takeItem(item);
            itemCursorPosition = 0;
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
    className="p-2"
    onClick={() => {
      handleCloseContainer();
    }}>
    Close
  </ButtonSvelte>

</section>
