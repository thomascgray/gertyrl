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
  import InventoryModalSvelte from "./ModalContent/Inventory.svelte";
  import CharacterModalSvelte from "./ModalContent/Character.svelte";
  import QuestsModalSvelte from "./ModalContent/Quests.svelte";
  import FactionsModalSvelte from "./ModalContent/Factions.svelte";

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

  const closeModal = () => {
    activeModal = undefined;
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
  .modal-wrapper {
    width: 480px;
    height: 480px;
    top: 0;
  }
</style>

{#if !hasChosenCharacter}
  <div class="text-center">
    <h1 class="uppercase text-4xl font-bold">Kingdom Killer</h1>
    <p class="italic text-gray-500">
      A turn based adventure game, for ages eight to eighty.
    </p>
    <CharacterSetupSvelte {player} {confirmCharacterSetup} />
  </div>
{/if}

<main>
  <MenuBarSvelte {player} {openModal} />

  <div class="relative">
    {#if hasChosenCharacter && !loadedBattlemapUuid}
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
      <div class="modal-wrapper">
        <CharacterModalSvelte {player} {closeModal} />
      </div>
    {/if}

    {#if activeModal === 'inventory'}
      <div class="modal-wrapper absolute">
        <div class="w-full h-full p-2">
          <InventoryModalSvelte {player} {closeModal} />
        </div>
      </div>
    {/if}

    {#if activeModal === 'quests'}
      <div class="modal-wrapper">
        <QuestsModalSvelte {player} {closeModal} />
      </div>
    {/if}

    {#if activeModal === 'factions'}
      <div class="modal-wrapper">
        <FactionsModalSvelte {player} {closeModal} />
      </div>
    {/if}

  </div>

</main>
