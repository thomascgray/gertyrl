<script>
  export let battlemap;
  export let unloadBattlemap;
  export let player;
  export let updatePlayer;
  export let addToLog;

  let updateContainer;

  import { DIRECTIONS } from "./config.js";
  import { handlePropCollision } from "./battlemap_utils.js";
  import * as Animate from "./animate.js";
  import _ from "lodash";
  import { onMount } from "svelte";
  import PlayerSvelte from "./Player.svelte";
  import ContainerSvelte from "./Container.svelte";
  import MobRendererSvelte from "./MobRenderer.svelte";
  import TileRendererSvelte from "./TileRenderer.svelte";
  import SceneryRendererSvelte from "./SceneryRenderer.svelte";
  import * as Combat from "./combat.js";
  import * as Data from "./data";
  import { positionsMatch, directionFromPositions } from "./utils.js";
  import PathFinding from "pathfinding";

  import { BATTLEMAP_HEIGHT, BATTLEMAP_WIDTH } from "./config";
  let nextPosition;
  let currentPosition;
  let openContainer;

  let pathfindingGrid;
  const pathfinder = new PathFinding.AStarFinder({
    allowDiagonal: false,
    heuristic: PathFinding.Heuristic.octile
  });

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    pathfindingGrid = new PathFinding.Grid(BATTLEMAP_WIDTH, BATTLEMAP_HEIGHT);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
    };
  });

  const postPlayerTurn = () => {};

  const turnTick = () => {
    let mobIndexToAct = 0;

    let intervalId = setInterval(() => {
      // do stuff with mob
      const mob = battlemap.mobs[mobIndexToAct];

      if (mob.healthStatus !== "alive") {
        return mob;
      }
      const grid = pathfindingGrid.clone();

      battlemap.mobs.forEach(m =>
        grid.setWalkableAt(m.position[0], m.position[1], false)
      );

      const newPath = pathfinder.findPath(
        mob.position[0],
        mob.position[1],
        player.position[0],
        player.position[1],
        grid
      );
      newPath.shift();

      if (positionsMatch(player.position, newPath[0])) {
        Animate.mobLunge(
          mob.uuid,
          directionFromPositions(mob.position, player.position)
        );
      } else {
        mob.position = newPath[0];
      }

      const indexOf = battlemap.mobs.findIndex(m => m.uuid === mob.uuid);
      battlemap.mobs[indexOf] = mob;

      mobIndexToAct = mobIndexToAct + 1;

      if (mobIndexToAct >= battlemap.mobs.length) {
        clearInterval(intervalId);
      }
    }, 100);
  };

  const nextTurn = () => {};

  const handleKeyUp = e => {};

  const handleKeyDown = e => {
    e.stopPropagation();
    e.preventDefault();

    if (openContainer) {
      return;
    }

    currentPosition = _.cloneDeep(player.position);
    nextPosition = _.cloneDeep(player.position);

    let blockMovement = false;
    let collidedProp;
    let collidedMob;
    let direction;

    switch (e.key) {
      case "s":
        nextPosition[1] = nextPosition[1] + 1;
        direction = DIRECTIONS.DOWN;
        break;
      case "w":
        nextPosition[1] = nextPosition[1] - 1;
        direction = DIRECTIONS.UP;
        break;
      case "a":
        nextPosition[0] = nextPosition[0] - 1;
        direction = DIRECTIONS.LEFT;
        break;
      case "d":
        nextPosition[0] = nextPosition[0] + 1;
        direction = DIRECTIONS.RIGHT;
        break;
      case "p":
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

      Animate.playerLunge(direction);

      if (collidedMob.healthStatus === "alive") {
        setTimeout(() => {}, 1000);
        collidedMob = Combat.meleeHit(player, collidedMob, addToLog);

        battlemap.mobs[
          battlemap.mobs.findIndex(m => m.uuid === collidedMob.uuid)
        ] = collidedMob;

        collidedMob = collidedMob;
        battlemap = battlemap;
      } else {
        addToLog(`you begin looting the ${collidedMob.name}`);
        openContainer = collidedMob;
        updateContainer = callback => {
          const updatedContainer = callback(collidedMob);
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
    background-image: url("/sprites/background-dot.png");
    background-repeat: repeat;
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

    {#if player}
      <PlayerSvelte {player} isWorld={false} />
    {/if}

    {#if openContainer}
      <ContainerSvelte
        container={openContainer}
        {updateContainer}
        {updatePlayer}
        {handleCloseContainer} />
    {/if}

  </div>

</section>
