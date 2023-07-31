<script lang="ts">
  import type { PageServerData } from './$types';
  import AppTable from '$lib/components/AppTable.svelte';
  import AppRow from '$lib/components/AppRow.svelte';

  export let data: PageServerData;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;
</script>

<AppTable
  {items}
  {totalPages}
  name={{ singular: 'product' }}
  columns={['Name', 'Price', 'Quantity', 'Image']}
>
  {#each items as { id, name, price, quantity, image }}
    <AppRow itemId={id} headingColumn={name} columns={[price, quantity]}>
      <td class="px-6 py-4">
        <a href={image} target="_blank">
          <img class="h-8 w-8 rounded-lg" src={image} alt={name} />
        </a>
      </td>
    </AppRow>
  {/each}
</AppTable>
