<script>
  import { onMount } from "svelte";
  import ButtonSvelte from "./UI/Button.svelte";
  export let confirmCharacterSetup;

  let selectedRace;
  let selectedProfession;
  let selectedSkills = [];
  let baseMuscleAttribute = 5;
  let baseReflexAttribute = 5;
  let baseMindAttribute = 5;
  let baseCunningAttribute = 5;
  let additionalMuscleAttribute = 0;
  let additionalReflexAttribute = 0;
  let additionalMindAttribute = 0;
  let additionalCunningAttribute = 0;

  let playerName;

  let raceCarousel;
  let professionCarousel;
  let races = [
    {
      name: "Human",
      description: "humans are human"
    },
    {
      name: "Drugar",
      description: "dwarves but not"
    },
    {
      name: "Elurin",
      description: "elves but not"
    }
  ];

  let professions = [
    {
      name: "Warrior",
      description: "fighters who like to do fighting"
    },
    {
      name: "Beast Master",
      description: "control animals"
    },
    {
      name: "Necromancer",
      description: "raise things from the dead"
    }
  ];

  const possibleSkills = [
    "Simple Weapons",
    "Martial Weapons",
    "Ranged Weapons",
    "First Aid",
    "Speechcraft"
  ];

  onMount(() => {
    raceCarousel = new Siema({
      selector: ".race-carousel",
      perPage: 1,
      loop: true
    });

    professionCarousel = new Siema({
      selector: ".profession-carousel",
      perPage: 1,
      loop: true
    });
  });
</script>

<section class="mt-4 text-left">
  <h3 class="mb-2 uppercase font-bold">Race</h3>
  <div class="flex h-24">
    <ButtonSvelte
      onClick={() => {
        raceCarousel.prev();
      }}>
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path
          class="heroicon-ui"
          d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4
          1.4L11.42 12l3.3 3.3z" />
      </svg>
    </ButtonSvelte>
    <div class="race-carousel w-full">
      {#each races as race}
        <div class="carousel-item text-center">
          <p>{race.name}</p>
          <p>{race.description}</p>
        </div>
      {/each}
    </div>
    <ButtonSvelte
      onClick={() => {
        raceCarousel.next();
      }}>
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path
          class="heroicon-ui"
          d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0
          1-1.4-1.4l3.29-3.3-3.3-3.3z" />
      </svg>
    </ButtonSvelte>
  </div>

  <h3 class="mt-4 mb-2 uppercase font-bold">Profession</h3>
  <div class="flex h-24">
    <ButtonSvelte
      onClick={() => {
        professionCarousel.prev();
      }}>
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path
          class="heroicon-ui"
          d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4
          1.4L11.42 12l3.3 3.3z" />
      </svg>
    </ButtonSvelte>
    <div class="profession-carousel w-full">
      {#each professions as profession}
        <div class="carousel-item text-center">
          <p>{profession.name}</p>
          <p>{profession.description}</p>
        </div>
      {/each}
    </div>
    <ButtonSvelte
      onClick={() => {
        professionCarousel.next();
      }}>
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path
          class="heroicon-ui"
          d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0
          1-1.4-1.4l3.29-3.3-3.3-3.3z" />
      </svg>
    </ButtonSvelte>
  </div>

  <h3 class="mt-4 mb-2 uppercase font-bold">Attributes</h3>
  <div class="flex">
    <span class="w-24 uppercase font-bold">Muscle</span>
    <div class="flex">
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalMuscleAttribute = additionalMuscleAttribute - 1;
        }}>
        -
      </ButtonSvelte>
      <span class="mx-2">
        {baseMuscleAttribute + additionalMuscleAttribute}
      </span>
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalMuscleAttribute = additionalMuscleAttribute + 1;
        }}>
        +
      </ButtonSvelte>
    </div>
  </div>
  <span class="italic text-gray-500">Increases melee damage, HP</span>

  <div class="flex mt-2">
    <span class="w-24 uppercase font-bold">Reflex</span>
    <div class="flex">
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalReflexAttribute = additionalReflexAttribute - 1;
        }}>
        <span>-</span>
      </ButtonSvelte>
      <span class="mx-2">
        {baseReflexAttribute + additionalReflexAttribute}
      </span>
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalReflexAttribute = additionalReflexAttribute + 1;
        }}>
        <span>+</span>
      </ButtonSvelte>
    </div>
  </div>
  <span class="italic text-gray-500">Increases ranged weapon damage, AC</span>

  <div class="flex mt-2">
    <span class=" w-24 uppercase font-bold">Mind</span>
    <div class="flex">
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalMindAttribute = additionalMindAttribute - 1;
        }}>
        -
      </ButtonSvelte>
      <span class="mx-2">{baseMindAttribute + additionalMindAttribute}</span>
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalMindAttribute = additionalMindAttribute + 1;
        }}>
        +
      </ButtonSvelte>
    </div>
  </div>
  <span class="italic text-gray-500">
    Increases spell damage, spell resistance
  </span>

  <div class="flex mt-2">
    <span class=" w-24 uppercase font-bold">Cunning</span>
    <div class="flex">
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalCunningAttribute = additionalCunningAttribute - 1;
        }}>
        -
      </ButtonSvelte>
      <span class="mx-2">
        {baseCunningAttribute + additionalCunningAttribute}
      </span>
      <ButtonSvelte
        className="w-6 h-6"
        onClick={() => {
          additionalCunningAttribute = additionalCunningAttribute + 1;
        }}>
        +
      </ButtonSvelte>
    </div>
  </div>
  <span class="italic text-gray-500">
    Increases all critical hit chance, some skills
  </span>

  <h3 class="mt-4">Choose Your Starting Skills</h3>
  <ul>
    {#each possibleSkills as skill}
      <li>
        <label>
          <input type="checkbox" bind:group={selectedSkills} value={skill} />
          {skill}
        </label>
      </li>
    {/each}
  </ul>

  <h3 class="mt-4">What is your name?</h3>

  <input
    class="p-2 block text-black"
    bind:value={playerName}
    placeholder="Name..." />

  <ButtonSvelte
    className="mt-4"
    onClick={() => {
      let selectedRace = races[raceCarousel.currentSlide];
      let selectedProfession = professions[professionCarousel.currentSlide];
      confirmCharacterSetup({
        name: playerName,
        race: selectedRace,
        profession: selectedProfession,
        skills: selectedSkills
      });
    }}>
    Confirm
  </ButtonSvelte>

</section>
