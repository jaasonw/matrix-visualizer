<script lang="ts">
  import { csvToArray, matrixToLatex } from "$lib/util";
  import { goto } from "$app/navigation";
  import { matrix } from "$lib/stores";
  import katex from "katex";
  import Footer from "$lib/Footer.svelte";

  let _matrix: string;
  let input = "";
  let error = "";
  let showError = false;

  function getExample() {
    input = `x 53 61\n10 x 7\n67 91 x`;
  }

  $: try {
    _matrix = katex.renderToString(matrixToLatex(csvToArray(input)));
    error = "";
  } catch (e) {
    error = e as string;
  }
</script>

<svelte:head>
  <title>Matrix Visualizer</title>
  <meta
    name="description"
    content="This calculator allows you to interactively perform row operations on an m x n dimensional matrix with support for symbolic math"
  />
</svelte:head>

<div class="flex justify-center items-center w-screen h-screen">
  <div
    class="flex flex-col items-center justify-center border p-5 rounded-md w-11/12 max-w-3xl bg-gray-50"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold">elementary row operations calculator</h1>
      <h2 class="text-lg">created by jasonw</h2>
      <div>
        This calculator allows you to interactively perform row operations on an
        m x n dimensional matrix with support for symbolic math (<span
          on:click={getExample}
          on:keypress={getExample}
          class=" text-blue-500 hover:text-blue-400 hover:cursor-pointer"
          >try an example</span
        >).<br /><br />
        If you found this helpful, consider donating with the link below : )
      </div>
      <form
        class="flex flex-col w-full"
        on:submit|preventDefault={() => {
          try {
            $matrix = csvToArray(input);
            katex.renderToString(matrixToLatex(csvToArray(input)));
            goto("/calc");
          } catch (e) {
            showError = true;
          }
        }}
      >
        <textarea
          bind:value={input}
          on:keypress={() => {
            showError = false;
          }}
          class="overflow-auto h-20 my-2 rounded-md border"
        />
        <button
          type="submit"
          class="my-2 p-3 bg-black text-white rounded-md transition-all"
          >calculate</button
        >
      </form>
    </div>

    {#if input.length > 0}
      <div class="p-2 m-2">{@html _matrix}</div>
    {/if}

    {#if showError}
      <div class="text-red-500">{error}</div>
    {/if}
    <Footer />
  </div>
</div>
