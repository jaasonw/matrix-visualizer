<script lang="ts">
  export let rows = 0;
  export let name = "";
  const rowNums = [...Array(rows).keys()];
</script>

<select class="h-9 rounded-md" {name} id="add">
  {#each rowNums as row}
    <option value={row}>R{row + 1}</option>
  {/each}
</select>
