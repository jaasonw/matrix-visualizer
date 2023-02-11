<script lang="ts">
  import {
    faArrowRotateLeft,
    faArrowRotateRight,
    faArrowsRotate,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import type { Step } from "./Step";

  export let steps: Step[];
  export let undoBuffer: Step[];

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

<div>
  <button
    on:click={undo}
    class="rounded-md p-1 m-1 hover:bg-black hover:text-white border"
    ><Fa icon={faArrowRotateLeft} /></button
  >
  <button
    on:click={reset}
    class="rounded-md p-1 m-1 hover:bg-black hover:text-white border"
    ><Fa icon={faArrowsRotate} /></button
  >
  <button
    on:click={redo}
    class="rounded-md p-1 m-1 hover:bg-black hover:text-white border"
    ><Fa icon={faArrowRotateRight} /></button
  >
</div>
