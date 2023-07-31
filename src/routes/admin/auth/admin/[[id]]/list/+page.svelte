<script lang="ts">
  import type { PageServerData } from './$types';
  import AppTable from '$lib/components/AppTable.svelte';
  import AppRow from '$lib/components/AppRow.svelte';

  export let data: PageServerData;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;
</script>

<AppTable {items} {totalPages} name={{ singular: 'admin' }} columns={['Name', 'Email']}>
  {#each items as { id, name, email }}
    <AppRow itemId={id} headingColumn={name} columns={[email]} />
  {/each}
</AppTable>
