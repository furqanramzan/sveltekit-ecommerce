<script lang="ts">
  import AppTable from '$lib/components/AppTable.svelte';
  import AppRow from '$lib/components/AppRow.svelte';

  export let data;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;

  const name = { singular: 'product' };
</script>

<AppTable
  {items}
  {totalPages}
  {name}
  columns={['Name', 'Price', 'Quantity', 'Category', 'Image']}
  dummy
>
  {#each items as item}
    <AppRow
      itemId={item.id}
      headingColumn={item.name}
      columns={[item.price, item.quantity]}
      link={name.singular}
    >
      <td class="px-6 py-4">
        <span
          class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
        >
          {item.category?.name}
        </span>
      </td>
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
