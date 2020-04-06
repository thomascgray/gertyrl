<script>
  import WorldMapSvelte from "./WorldMap.svelte";
  import BattlemapSvelte from "./BattleMap.svelte";
  import CharacterSetupSvelte from "./CharacterSetup.svelte";
  import PlayerPaneSvelte from "./PlayerPane/PlayerPlane.svelte";
  import LogPaneSvelte from "./LogPane.svelte";

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

  let log = ["welcome to the game"];

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
    log.unshift(message);
    log = log;
  };
</script>

<style>
  main {
    width: 900px;
    margin: 0 auto;
    background: #353b48;
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
    <WorldMapSvelte
      {loadBattlemap}
      {player}
      {updatePlayer}
      {addToLog}
      {settlements}
      {worldScenery} />

    <div class="flex">
      <LogPaneSvelte {log} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

  {#if hasChosenCharacter && loadedBattlemapUuid}
    <BattlemapSvelte
      battlemap={loadedBattleMap}
      {unloadBattlemap}
      {player}
      {updatePlayer}
      {addToLog} />
    <div class="flex">
      <LogPaneSvelte {log} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

</main>
