<script>
  export let battlemap;
  export let unloadBattlemap;
  export let player;
  export let updatePlayer;
  export let addToLog;

  let updateContainer;

  import _ from "lodash";
  import { onMount } from "svelte";
  import PlayerSvelte from "./Player.svelte";
  import ContainerSvelte from "./Container.svelte";
  import MobRendererSvelte from "./MobRenderer.svelte";
  import TileRendererSvelte from "./TileRenderer.svelte";
  import SceneryRendererSvelte from "./SceneryRenderer.svelte";
  import * as Combat from "./combat.js";
  import * as Data from "./data";
  import PathFinding from "pathfinding";
  import { positionsMatch } from "./utils.js";

  import { BATTLEMAP_HEIGHT, BATTLEMAP_WIDTH } from "./config";
  let nextPosition;
  let currentPosition;
  let openContainer;

  let pathfindingGrid;
  var pathfinder = new PathFinding.AStarFinder();

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    pathfindingGrid = new PathFinding.Grid(battlemap.collisionGrid);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
    };
  });

  const postPlayerTurn = () => {};

  const turnTick = () => {
    // all the mobs do some movement

    battlemap.mobs = battlemap.mobs.map(mob => {
      if (mob.healthStatus !== "alive") {
        return mob;
      }
      const grid = pathfindingGrid.clone();
      const path = pathfinder.findPath(
        mob.position[0],
        mob.position[1],
        player.position[0],
        player.position[1],
        grid
      );

      if (path.length > 2) {
        mob.position = path[1];
      } else if (positionsMatch(path[1], player.position)) {
        console.log("path", path);

        // TODO this isnt working because its inside a map
        // do we need some sort of animation queue bullshit?
        // mob.position = path[1];
        setTimeout(() => {
          console.log("a");
          // mob.position = path[0];
        }, 100);
      }

      return mob;
    });

    battlemap = battlemap;
  };

  const nextTurn = () => {};

  const handleKeyUp = e => {};

  const handleKeyDown = e => {
    currentPosition = _.cloneDeep(player.position);
    nextPosition = _.cloneDeep(player.position);
    let blockMovement = false;
    let collidedProp;
    let collidedMob;

    switch (e.key) {
      case "s":
        nextPosition[1] = nextPosition[1] + 1;
        break;
      case "w":
        nextPosition[1] = nextPosition[1] - 1;
        break;
      case "a":
        nextPosition[0] = nextPosition[0] - 1;
        break;
      case "d":
        nextPosition[0] = nextPosition[0] + 1;
        break;
      case " ":
        turnTick();
        break;
    }

    collidedProp = battlemap.props.find(p => {
      return (
        p.position[0] === nextPosition[0] && p.position[1] === nextPosition[1]
      );
    });

    if (collidedProp) {
      if (collidedProp.type === "container") {
        player.position = nextPosition;
        setTimeout(() => {
          player.position = currentPosition;
        }, 100);
        addToLog(`you open up the ${collidedProp.name}`);
        blockMovement = true;
        openContainer = collidedProp;

        updateContainer = callback => {
          const updatedContainer = callback(collidedProp);
          openContainer = updatedContainer;
          battlemap = battlemap;
        };
      } else {
        openContainer = undefined;
      }
      if (collidedProp && collidedProp.type === "stairs_up") {
        setTimeout(() => {
          unloadBattlemap(battlemap);
        }, 200);
      }
    } else {
      collidedMob = battlemap.mobs.find(m => {
        return (
          m.position[0] === nextPosition[0] && m.position[1] === nextPosition[1]
        );
      });
    }

    if (collidedMob) {
      blockMovement = true;

      player.position = nextPosition;
      setTimeout(() => {
        player.position = currentPosition;
      }, 100);

      if (collidedMob.healthStatus === "alive") {
        setTimeout(() => {}, 1000);
        collidedMob = Combat.meleeHit(player, collidedMob, addToLog);

        battlemap.mobs.splice(
          battlemap.mobs.findIndex(m => m.uuid === collidedMob.uuid),
          1
        );
        battlemap.mobs.push(collidedMob);

        battlemap.mobs = battlemap.mobs;

        collidedMob = collidedMob;
        battlemap = battlemap;
      } else {
        addToLog(`you begin looting the ${collidedMob.name}`);
        openContainer = collidedMob;
        updateContainer = callback => {
          const updatedContainer = callback(collidedMob);
          console.log("aaa");
          openContainer = updatedContainer;
          battlemap = battlemap;
        };
      }
    }

    if (!blockMovement) {
      player.position = nextPosition;
      player = player;
    }

    // turnTick();
  };

  const handleCloseContainer = () => {
    openContainer = undefined;
  };
</script>

<style>
  .map-area {
    position: relative;
    outline: 1px solid red;
    background-color: #222323;
  }
</style>

<section>
  <div
    class="map-area"
    style="width: {BATTLEMAP_WIDTH * 40}px; height: {BATTLEMAP_HEIGHT * 40}px">
    {#if battlemap.props}
      {#each battlemap.props as prop}
        <TileRendererSvelte tile={prop} />
      {/each}
    {/if}

    {#if battlemap.scenery}
      {#each battlemap.scenery as scenery}
        <SceneryRendererSvelte {scenery} />
      {/each}
    {/if}

    {#if battlemap.mobs}
      {#each battlemap.mobs as mob}
        <MobRendererSvelte {mob} />
      {/each}
    {/if}

    <PlayerSvelte {player} isWorld={false} />

    {#if openContainer}
      <ContainerSvelte
        container={openContainer}
        {updateContainer}
        {updatePlayer}
        {handleCloseContainer} />
    {/if}

  </div>

</section>
