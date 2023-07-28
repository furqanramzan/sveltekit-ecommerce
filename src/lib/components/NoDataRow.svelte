<script lang="ts">
  export let totalItems: number;
  export let colspan: number;
</script>

{#if totalItems === 0}
  <tr
    class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
  >
    <th
      {colspan}
      scope="row"
      class="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white"
    >
      Currently, there is no data available.
    </th>
  </tr>
{/if}
