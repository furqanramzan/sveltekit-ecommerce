<script lang="ts">
  import AppTable from '$lib/components/AppTable.svelte';
  import AppRow from '$lib/components/AppRow.svelte';

  export let data;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;

  const name = { singular: 'admin' };
</script>

<AppTable {items} {totalPages} {name} columns={['Name', 'Email']}>
  {#each items as item}
    <AppRow
      itemId={item.id}
      headingColumn={item.name}
      columns={[item.email]}
      link={name.singular}
    />
  {/each}
</AppTable>
