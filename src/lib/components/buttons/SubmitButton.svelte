<script lang="ts">
  export let wFull = false;
  export let submitting = false;

  $: wFullClass = wFull ? 'w-full justify-center' : '';
</script>

<button
  disabled={submitting}
  type="submit"
  class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 {wFullClass}"
>
  {#if submitting}
    Loading...
  {:else}
    <slot />
  {/if}
</button>
