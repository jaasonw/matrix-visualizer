<script lang="ts">
  import { faPlay } from "@fortawesome/free-solid-svg-icons";
  import katex from "katex";
  import { simplify } from "mathjs";
  import Fa from "svelte-fa";
  import { rowSum, rowSwap, scalerMultiply } from "./rops";
  import RowSelector from "./RowSelector.svelte";
  import type { Step } from "./Step";
  import { matrix } from "./stores";

  export let steps: Step[];
  export let undoBuffer: Step[];
  export let error: string;

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
        operation: `${simplify(scalar).toTex()} R${parseInt(row) + 1}`,
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
        operation: `${simplify(scalar).toTex()} R${parseInt(row1) + 1} + R${
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
</script>

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
        class="flex justify-center items-center rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
        ><Fa icon={faPlay} /></button
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
        class="flex justify-center items-center rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
        ><Fa icon={faPlay} /></button
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
        class="flex justify-center items-center rounded-md w-10 mx-3 hover:bg-black hover:text-white border"
        ><Fa icon={faPlay} /></button
      >
    </div>
  </form>
</div>
