<script>
  export let log;
</script>

<style>
  section {
    width: 400px;
  }
</style>

<section>
  {#each log as logMessage}
    <p>{logMessage}</p>
  {/each}

</section>
