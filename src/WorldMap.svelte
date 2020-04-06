<script>
  export let loadBattlemap;
  export let updatePlayer;
  export let player;
  export let addToLog;
  export let settlements;
  export let worldScenery;

  import { format, addDays } from "date-fns";
  import { onMount } from "svelte";
  import { positionsMatch } from "./utils.js";
  import * as Data from "./data.js";
  import PlayerSvelte from "./Player.svelte";
  import ButtonSvelte from "./UI/Button.svelte";
  import TileRendererSvelte from "./TileRenderer.svelte";
  import SceneryRendererSvelte from "./SceneryRenderer.svelte";
  import { WORLDMAP_WIDTH, WORLDMAP_HEIGHT } from "./config";

  import _ from "lodash";

  let nextPosition;

  let currentSettlement;
  let currentScenery;

  const handleKeyUp = e => {};

  const handleKeyDown = e => {
    nextPosition = _.cloneDeep(player.worldPosition);
    let blockMovement = false;
    switch (e.key) {
      case "s":
        updatePlayer(player => {
          nextPosition[1] = nextPosition[1] + 1;
        });
        break;
      case "w":
        updatePlayer(player => {
          nextPosition[1] = nextPosition[1] - 1;
        });
        break;
      case "a":
        updatePlayer(player => {
          nextPosition[0] = nextPosition[0] - 1;
        });
        break;
      case "d":
        updatePlayer(player => {
          nextPosition[0] = nextPosition[0] + 1;
        });
        break;
      case "Enter":
        if (currentSettlement) {
          loadBattlemap(currentSettlement.battlemapUuid);
          updatePlayer(player => {
            player.position[0] = 3;
            player.position[1] = 3;
          });
        }
        break;
    }

    if (!blockMovement) {
      player.worldPosition = nextPosition;
    }
    currentScenery = worldScenery.find(ws =>
      positionsMatch(ws[0], player.worldPosition)
    );

    if (!currentScenery) {
      currentSettlement = settlements.find(s =>
        positionsMatch(s.position, player.worldPosition)
      );
    }

    if (currentScenery) {
      addToLog(`you pass by a ${currentScenery[2]}`);
    }

    if (currentSettlement) {
      addToLog(`you pass by ${currentSettlement.name}`);
    }
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
    background-color: #222323;
  }
</style>

<section class="flex">
  <div
    class="map-area"
    style="width: {WORLDMAP_WIDTH * 40}px; height: {WORLDMAP_HEIGHT * 40}px">
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

    <PlayerSvelte {player} isWorld={true} />
  </div>

  <div>
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
  </div>

</section>
