<script lang="ts">
  import { goto } from "$app/navigation";
  import Footer from "$lib/Footer.svelte";
  import HistoryController from "$lib/HistoryController.svelte";
  import HistoryView from "$lib/HistoryView.svelte";
  import RecentView from "$lib/RecentView.svelte";
  import RowOpsController from "$lib/RowOpsController.svelte";
  import type { Step } from "$lib/Step";
  import { matrix } from "$lib/stores";
  import { onMount } from "svelte";

  onMount(() => {
    if ($matrix.length == 0) {
      goto("../");
    }
  });

  let steps: Step[] = [{ matrix: structuredClone($matrix), operation: "" }];
  let undoBuffer: Step[] = [];
  let error = "";
</script>

<svelte:head>
  <title>Matrix Visualizer</title>
  <meta
    name="description"
    content="This calculator allows you to interactively perform row operations on an m x n dimensional matrix with support for symbolic math"
  />
</svelte:head>

<div
  class="flex flex-col items-center justify-center border p-5 m-10 rounded-md w-11/12 max-w-3xl bg-gray-50"
>
  <RecentView bind:steps />
  <RowOpsController bind:steps bind:undoBuffer bind:error />
  <HistoryController bind:steps bind:undoBuffer />
  <button
    class="bg-black text-white p-1 m-1 rounded-md hover:bg-gray-700"
    on:click={() => {
      goto("../");
    }}>New Matrix</button
  >
  <HistoryView bind:steps />
  <Footer />
</div>
