<script>
  export let player;

  import { getAttributeModifier } from "../utils";
</script>

<section>
  <p class="uppercase font-bold">
    <span class="inline-block w-12">Mus:</span>
    <span class="text-gray-500">{player.attributes.muscle}</span>
    <span class="text-blue-500">
      ({getAttributeModifier(player.attributes.muscle)})
    </span>
  </p>
  <p class="uppercase font-bold">
    <span class="inline-block w-12">Ref:</span>
    <span class="text-gray-500">{player.attributes.reflex}</span>
    <span class="text-blue-500">
      ({getAttributeModifier(player.attributes.reflex)})
    </span>
  </p>
  <p class="uppercase font-bold">
    <span class="inline-block w-12">Min:</span>
    <span class="text-gray-500">{player.attributes.mind}</span>
    <span class="text-blue-500">
      ({getAttributeModifier(player.attributes.mind)})
    </span>
  </p>
  <p class="uppercase font-bold">
    <span class="inline-block w-12">Cun:</span>
    <span class="text-gray-500">{player.attributes.cunning}</span>
    <span class="text-blue-500">
      ({getAttributeModifier(player.attributes.cunning)})
    </span>
  </p>
</section>
