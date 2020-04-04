<script>
  export let loadBattlemap;
  export let updatePlayer;
  export let player;
  export let addToLog;
  export let settlements;
  export let worldScenery;

  import { format, addDays } from "date-fns";
  import { onMount } from "svelte";
  import * as Data from "./data.js";
  import PlayerSvelte from "./Player.svelte";
  import ButtonSvelte from "./UI/Button.svelte";
  import TileRendererSvelte from "./TileRenderer.svelte";
  import SceneryRendererSvelte from "./SceneryRenderer.svelte";
  import { WORLDMAP_WIDTH, WORLDMAP_HEIGHT } from "./config";

  import _ from "lodash";

  let currentSettlement;

  const handleKeyUp = e => {};

  const handleKeyDown = e => {
    switch (e.key) {
      case "s":
        updatePlayer(player => {
          player.worldPosition[1] = player.worldPosition[1] + 1;
        });
        break;
      case "w":
        updatePlayer(player => {
          player.worldPosition[1] = player.worldPosition[1] - 1;
        });
        break;
      case "a":
        updatePlayer(player => {
          player.worldPosition[0] = player.worldPosition[0] - 1;
        });
        break;
      case "d":
        updatePlayer(player => {
          player.worldPosition[0] = player.worldPosition[0] + 1;
        });
        break;
    }

    currentSettlement = settlements.find(
      s =>
        s.position[0] === player.worldPosition[0] &&
        s.position[1] === player.worldPosition[1]
    );
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
    };
  });
</script>

<style>
  .map-area {
    position: relative;
    outline: 1px solid red;
    background-color: #222323;
  }
  .player-tile {
    position: absolute;
    transition: all 0.2s;
  }
</style>

<section>
  <div
    class="map-area"
    style="width: {WORLDMAP_WIDTH * 32}px; height: {WORLDMAP_HEIGHT * 32}px">
    {#if settlements}
      {#each settlements as settlement}
        <TileRendererSvelte tile={settlement} />
      {/each}
    {/if}

    {#if worldScenery}
      {#each worldScenery as ws}
        <SceneryRendererSvelte scenery={ws} />
      {/each}
    {/if}

    <div
      style="top: {player.worldPosition[1] * 32}px; left: {player.worldPosition[0] * 32}px"
      class="player-tile">

      <PlayerSvelte {player} />
    </div>

  </div>

  {#if currentSettlement}
    <h3>{currentSettlement.name}</h3>

    {#if currentSettlement.battlemapUuid}
      <ButtonSvelte
        onClick={() => {
          loadBattlemap(currentSettlement.battlemapUuid);
          updatePlayer(player => {
            player.position[0] = 3;
            player.position[1] = 3;
          });
        }}>
        Visit this settlement
      </ButtonSvelte>
    {/if}
  {/if}

</section>
