<script lang="ts">
  import katex from "katex";
  import type { Step } from "../Step";
  import { matrixToLatex } from "../util";

  export let steps: Step[] = [];
</script>

<div class="flex gap-2 m-3">
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
