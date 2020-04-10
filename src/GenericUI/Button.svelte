<script>
  export let onClick;

  export let className = "";
</script>

<button class={`bg-gray-600 text-white ${className}`} on:click={onClick}>
  <slot />
</button>
