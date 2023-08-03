<script lang="ts">
  import type { PageServerData } from './$types';
  import AppTable from '$lib/components/AppTable.svelte';
  import AppRow from '$lib/components/AppRow.svelte';

  export let data: PageServerData;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;

  const name = { singular: 'category', plural: 'categories' };
</script>

<AppTable {items} {totalPages} {name} columns={['Name', 'Image']}>
  {#each items as item}
    <AppRow itemId={item.id} headingColumn={item.name} link={name.singular}>
      <td class="px-6 py-4">
        <a href={item.image} target="_blank">
          <img
            loading="lazy"
            width="32"
            height="32"
            class="rounded-md"
            src={item.image}
            alt={item.name}
          />
        </a>
      </td>
    </AppRow>
  {/each}
</AppTable>
