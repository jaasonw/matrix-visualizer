<script lang="ts">
  import katex from "katex";
  import { rowSum, rowSwap, scalerMultiply } from "$lib/rops";
  import RowSelector from "$lib/RowSelector.svelte";
  import { matrix } from "$lib/stores";
  import { matrixToLatex } from "$lib/util";
  import { goto } from "$app/navigation";
  import Fa from "svelte-fa";
  import {
    faArrowRotateLeft,
    faArrowRotateRight,
    faArrowsRotate,
    faFlag,
  } from "@fortawesome/free-solid-svg-icons";
  import Footer from "$lib/Footer.svelte";

  interface Step {
    matrix: string[][];
    operation: string;
  }

  let steps: Step[] = [{ matrix: structuredClone($matrix), operation: "" }];
  let undoBuffer: Step[] = [];
  let error = "";

  function performRowSwap(row1: string, row2: string) {
    steps = [
      ...steps,
      {
        matrix: rowSwap(
          steps[steps.length - 1].matrix,
          parseInt(row1),
          parseInt(row2)
        ),
        operation: `R${parseInt(row1) + 1} \\leftrightarrow R${
          parseInt(row2) + 1
        }`,
      },
    ];
  }

  function performScalarMultiply(row: string, scalar: string) {
    steps = [
      ...steps,
      {
        matrix: scalerMultiply(
          steps[steps.length - 1].matrix,
          parseInt(row),
          scalar
        ),
        operation: `${scalar}R${parseInt(row) + 1}`,
      },
    ];
  }

  function performRowSum(row1: string, row2: string, scalar: string) {
    steps = [
      ...steps,
      {
        matrix: rowSum(
          steps[steps.length - 1].matrix,
          parseInt(row1),
          parseInt(row2),
          scalar
        ),
        operation: `${scalar}R${parseInt(row1) + 1} + R${
          parseInt(row2) + 1
        } \\rightarrow R${parseInt(row2) + 1}`,
      },
    ];
  }

  function handleRowSwap(e: any) {
    if (!e) return;
    const formData = new FormData(e.target);
    const row1 = [...formData.entries()][0][1] as string;
    const row2 = [...formData.entries()][1][1] as string;
    performRowSwap(row1, row2);
    undoBuffer = [];
  }

  function handleScalarMuliply(e: any) {
    if (!e) return;
    const formData = new FormData(e.target);
    const scalar = [...formData.entries()][0][1] as string;
    const row = [...formData.entries()][1][1] as string;
    performScalarMultiply(row, scalar);
    undoBuffer = [];
  }

  function handleRowSum(e: any) {
    if (!e) return;
    const formData = new FormData(e.target);
    const scalar = [...formData.entries()][0][1] as string;
    const row1 = [...formData.entries()][1][1] as string;
    const row2 = [...formData.entries()][2][1] as string;
    if (row1 == row2) {
      error = "Cannot row sum same row";
      return;
    }
    performRowSum(row1, row2, scalar);
    undoBuffer = [];
  }

  function undo() {
    if (steps.length > 1) undoBuffer.push(steps.pop() as Step);
    steps = steps;
  }

  function redo() {
    if (undoBuffer.length > 0) steps = [...steps, undoBuffer.shift() as Step];
  }

  function reset() {
    steps = [steps[0]];
    undoBuffer = [];
  }
</script>

<div
  class="flex flex-col items-center justify-center border p-5 m-10 rounded-md w-11/12 max-w-3xl bg-gray-50"
>
  <div class="flex gap-2">
    {#if steps.length > 1}
      <div class="flex flex-col items-center">
        <h2>BEFORE</h2>
        {@html katex.renderToString(
          matrixToLatex(steps[steps.length - 2].matrix)
        )}
      </div>
      <div class="flex flex-col items-center">
        <h2>AFTER</h2>
        {@html katex.renderToString(
          matrixToLatex(steps[steps.length - 1].matrix)
        )}
      </div>
    {:else}
      <div class="flex flex-col items-center">
        <h2>ORIGINAL MATRIX</h2>
        {@html katex.renderToString(
          matrixToLatex(steps[steps.length - 1].matrix)
        )}
      </div>
    {/if}
  </div>

  <div class="flex flex-col items-center w-60">
    <form
      class="grid grid-cols-2 w-full m-1"
      on:submit|preventDefault={handleRowSwap}
      autocomplete="off"
    >
      <div class="flex justify-end items-center gap-2">
        <RowSelector rows={$matrix.length} name="row1" />
        {@html katex.renderToString("\\leftrightarrow")}
        <RowSelector rows={$matrix.length} name="row2" />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
          >▶</button
        >
      </div>
    </form>
    <form
      class="grid grid-cols-2 w-full m-1"
      on:submit|preventDefault={handleScalarMuliply}
      autocomplete="off"
    >
      <div class="flex justify-end items-center gap-2">
        <input type="text" name="scalar" class="w-14 h-9 border rounded-md" />
        {@html katex.renderToString("\\cdot")}
        <RowSelector rows={$matrix.length} name="row" />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
          >▶</button
        >
      </div>
    </form>
    <form
      class="grid grid-cols-2 w-full m-1"
      on:submit|preventDefault={handleRowSum}
      autocomplete="off"
    >
      <div class="flex justify-end items-center gap-2">
        <input type="text" name="scalar" class="w-14 h-9 border rounded-md" />
        {@html katex.renderToString("\\cdot")}
        <RowSelector rows={$matrix.length} name="row1" />
        {@html katex.renderToString("+")}
        <RowSelector rows={$matrix.length} name="row1" />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
          >▶</button
        >
      </div>
    </form>
  </div>

  <div>
    <button on:click={undo} class="text-2xl p-2 hover:text-gray-600"
      ><Fa icon={faArrowRotateLeft} /></button
    >
    <button on:click={reset} class="text-2xl p-2 hover:text-gray-600"
      ><Fa icon={faArrowsRotate} /></button
    >
    <button on:click={redo} class="text-2xl p-2 hover:text-gray-600"
      ><Fa icon={faArrowRotateRight} /></button
    >
  </div>
  <button
    class="bg-black text-white p-1 m-1 rounded-md hover:bg-gray-700"
    on:click={() => {
      goto("../");
    }}>New Matrix</button
  >

  <h1 class="text-xl font-bold mb-3">Steps performed so far</h1>
  <div>
    <div class="flex flex-wrap gap-2">
      {#each steps as step}
        <div class="flex items-center">
          <div>
            {@html katex.renderToString(step.operation)}
          </div>
          <div>
            {@html katex.renderToString(matrixToLatex(step.matrix))}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- <div>
    {@html katex.renderToString(
      matrixToLatex([
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
      ])
    )}
  </div> -->
  <Footer />
</div>
