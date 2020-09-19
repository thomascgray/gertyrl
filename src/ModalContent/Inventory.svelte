<script>
  export let closeModal;
  export let player;

  const onDragStart = e => {
    e.preventDefault();
    console.log("e.target", e.target);
    e.dataTransfer.setData("text", e.target.id);
    console.log("e", e);
    console.log("on drag start");
  };

  const onDragOver = e => {
    e.preventDefault();
    console.log("drag over");
  };

  const onDragDrop = e => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
  };
</script>

<style>
  .item-grid {
    border: 1px solid green;
    width: 100%;
    height: 300px;
  }

  .item-cell {
    border: 1px solid red;
    width: 40px;
    height: 40px;
  }
</style>

<section class="bg-gray-800 text-gray-100 w-full h-full p-2">
  <div class="flex justify-between">
    <label class="uppercase font-bold">inventory</label>
    <button on:click={() => closeModal()}>close</button>
  </div>

  <div class="flex ">

    <div class="character w-1/2">
      <!-- character -->

    </div>

    <div class="item-grid relative">

      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>
      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>
      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>
      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>
      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>
      <div class="item-row flex">
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
        <div class="item-cell" on:dragover={onDragOver} on:drop={onDragDrop} />
      </div>

      <img
        id="sword"
        on:dragstart={onDragStart}
        draggable="true"
        style="top:0px; left: 40px;"
        class=" absolute pixelated"
        src="./sprites/sword.png"
        width="40px"
        height="40px"
        alt="" />
    </div>

  </div>
</section>
