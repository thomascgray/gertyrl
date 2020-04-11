<script>
  export let battlemap;
  export let unloadBattlemap;
  export let player;
  export let updatePlayer;
  export let addToLog;

  let updateContainer;

  import { DIRECTIONS } from "./config.js";
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
  import PathFinding from "pathfinding";
  import { positionsMatch } from "./utils.js";

  import { BATTLEMAP_HEIGHT, BATTLEMAP_WIDTH } from "./config";
  let nextPosition;
  let currentPosition;
  let openContainer;

  let pathfindingGrid;
  const pathfinder = new PathFinding.AStarFinder();

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

    // for every mob, if it doesnt have a pathfinding
    // list, make one

    battlemap.mobs = battlemap.mobs.map(mob => {
      if (mob.healthStatus !== "alive") {
        return mob;
      }
      console.log("player.position", player.position);
      const grid = pathfindingGrid.clone();
      const path = pathfinder.findPath(
        mob.position[0],
        mob.position[1],
        player.position[0],
        player.position[1],
        grid
      );
      path.shift();

      if (!mob.path) {
        mob.path = path;
        return mob;
      }

      console.log("initial mob.path", mob.path);

      mob.path = mob.path.filter((p, i) => {
        // if the position in path is the same as the position we've already got, keep it
        if (path[i] && positionsMatch(path[i], p)) {
          return true;
        }
      });

      console.log("new PATH", path);
      console.log(
        "we reduce mob path down to just the parts that match the NEW path",
        mob.path
      );

      path.splice(mob.path.length - 1);

      console.log(
        "so we remove from path the length of the new, shortened mob path"
      );
      console.log("leaving path as", path);

      // console.log("path", path);

      // so now mob path is what is was before UP TO the point they diverge

      // so now i need to take path AFTER this divergence and merge it into mob path

      // console.log("mob.path", mob.path);

      return mob;
    });

    battlemap = battlemap;
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

      Animate.playerLunge(direction);

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
