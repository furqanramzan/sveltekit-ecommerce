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
  columns={['Name', 'Price', 'Quantity', 'Description']}
>
  {#each items as { id, name, description, price, quantity }}
    <AppRow itemId={id} headingColumn={name} columns={[price, quantity, description]} />
  {/each}
</AppTable>
