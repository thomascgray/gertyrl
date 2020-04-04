<script>
  import WorldMapSvelte from "./WorldMap.svelte";
  import BattlemapSvelte from "./Battlemap.svelte";
  import CharacterSetupSvelte from "./CharacterSetup.svelte";
  import PlayerPaneSvelte from "./PlayerPlane.svelte";

  import * as Data from "./data";
  import { CPlayer } from "./player";
  import { onMount } from "svelte";

  let player = new CPlayer();
  let settlements;
  let worldScenery;
  let hasChosenCharacter = true;
  let loadedBattlemapUuid;
  let loadedBattleMap;

  onMount(() => {
    Data.init();

    settlements = Data.getSettlements();
    worldScenery = Data.getWorldScenery();
  });

  let log = [];

  const updatePlayer = callback => {
    callback(player);
    player = player;
  };

  const loadBattlemap = battlemapUuid => {
    loadedBattlemapUuid = battlemapUuid;
    loadedBattleMap = Data.loadBattlemap(battlemapUuid);
  };

  const unloadBattlemap = battlemap => {
    // unload the battlemap from memory
    loadedBattlemapUuid = undefined;
    loadedBattleMap = undefined;

    // and then update the battlemap in storage
    Data.saveBattlemap(battlemap);
  };

  const confirmCharacterSetup = ({ name, race, profession, skills }) => {
    player.name = name;
    player.race = race;
    player.profession = profession;
    player.skills = skills;
    player = player;
    hasChosenCharacter = true;
  };

  const addToLog = message => {
    log = [...log, message];
  };
</script>

<style>
  main {
    width: 800px;
    margin: 0 auto;
    background: #353b48;
  }

  .player-wrapper {
    outline: 1px solid blue;
  }
</style>

<main class="mt-4 p-4">

  {#if !hasChosenCharacter}
    <div class="text-center">
      <h1 class="uppercase text-4xl font-bold">Kingdom Killer</h1>
      <p class="italic text-gray-500">
        A turn based adventure game, for ages eight to eighty.
      </p>
      <CharacterSetupSvelte {player} {confirmCharacterSetup} />
    </div>
  {/if}

  {#if hasChosenCharacter && !loadedBattlemapUuid}
    <div class="flex">
      <WorldMapSvelte
        {loadBattlemap}
        {player}
        {updatePlayer}
        {settlements}
        {worldScenery} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

  {#if hasChosenCharacter && loadedBattlemapUuid}
    <div class="flex">
      <BattlemapSvelte
        battlemap={loadedBattleMap}
        {unloadBattlemap}
        {player}
        {updatePlayer}
        {addToLog} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

  {#if hasChosenCharacter}
    <section class="player-wrapper">
      <h3>log</h3>

      {#each log as logMessage}
        <p>{logMessage}</p>
      {/each}
    </section>
  {/if}

</main>
