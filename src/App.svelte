<script>
  import WorldMapSvelte from "./WorldMap.svelte";
  import BattlemapSvelte from "./BattleMap.svelte";
  import CharacterSetupSvelte from "./CharacterSetup.svelte";
  import PlayerPaneSvelte from "./PlayerPane/PlayerPlane.svelte";
  import LogPaneSvelte from "./LogPane.svelte";
  import MenuBarSvelte from "./MenuBar.svelte";

  import * as Data from "./data";
  import { CPlayer } from "./player";
  import { onMount, tick } from "svelte";

  let player = new CPlayer();
  let settlements;
  let worldScenery;
  let hasChosenCharacter = true;
  let loadedBattlemapUuid;
  let loadedBattleMap;

  let activeModal = undefined;

  const openModal = modalToOpen => {
    activeModal = modalToOpen;
  };

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

  const travelToBattlemap = async (exitingBattlemap, enteringBattlemapId) => {
    unloadBattlemap(exitingBattlemap);
    await tick();
    loadBattlemap(enteringBattlemapId);
  };

  const confirmCharacterSetup = ({ name, race, profession, skills }) => {
    player.name = name;
    player.race = race;
    player.profession = profession;
    player.skills = skills;
    player = player;
    hasChosenCharacter = true;
  };

  const onPlayerDeath = () => {
    alert("you have died!");
    location.reload();
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
    position: relative;
  }
  .modal {
    position: absolute;
    top: 116px;
    width: 440px;
    height: 440px;
    left: 30px;
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
    <MenuBarSvelte {player} {openModal} />
    <WorldMapSvelte
      {loadBattlemap}
      {player}
      {updatePlayer}
      {addToLog}
      {settlements}
      {onPlayerDeath}
      {worldScenery} />

    <div class="flex">
      <LogPaneSvelte {log} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

  {#if hasChosenCharacter && loadedBattlemapUuid}
    <MenuBarSvelte {player} {openModal} />

    <BattlemapSvelte
      battlemap={loadedBattleMap}
      {unloadBattlemap}
      {travelToBattlemap}
      {player}
      {updatePlayer}
      {onPlayerDeath}
      {addToLog} />
    <div class="flex">
      <LogPaneSvelte {log} />
      <PlayerPaneSvelte {player} />
    </div>
  {/if}

  {#if activeModal === 'character'}
    <section class="modal bg-gray-800 text-gray-100 p-2">
      <span>character modal</span>
      <button on:click={() => openModal(undefined)}>close</button>

    </section>
  {/if}

  {#if activeModal === 'inventory'}
    <section class="modal bg-gray-800 text-gray-100 p-2">
      <span>inventory</span>
      {#if player.inventory.length >= 1}
        <ul>
          {#each player.inventory as inventoryItem}
            <li class="flex mb-2">
              <img
                class="pixelated mr-2"
                src="./sprites/{inventoryItem.sprite}.png"
                width="32px"
                height="32px"
                alt="" />
              <span>{inventoryItem.name}</span>

            </li>
          {/each}
        </ul>
      {:else}No items{/if}
      <button on:click={() => openModal(undefined)}>close</button>
    </section>
  {/if}

</main>
