<script lang="ts">
  import katex from "katex";
  import type { Step } from "./Step";
  import { matrixToLatex } from "./util";

  export let steps: Step[];
</script>

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
