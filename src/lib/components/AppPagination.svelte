<script lang="ts">
  import Icon, { loadIcons } from '@iconify/svelte';
  import { page } from '$app/stores';
  import { getParamsString } from '$lib/utils';

  export let totalPages: number;
  let searchParams: string;
  $: {
    const allParamsString = getParamsString($page.url.searchParams, ['page']);
    if (allParamsString) {
      searchParams = `?${allParamsString}&`;
    } else {
      searchParams = '?';
    }
  }
  $: pathname = $page.url.pathname + searchParams;

  $: currentPage = Number($page.url.searchParams.get('page')) || 1;

  function generateArray(params: number) {
    return Array.from({ length: params }, (_, index) => index + 1);
  }

  loadIcons(['mdi:arrow-left', 'mdi:arrow-right']);
</script>

{#if totalPages > 1}
  <div class="flex justify-end" {...$$restProps}>
    <nav aria-label="Page navigation example">
      <ul class="inline-flex h-10 -space-x-px text-base">
        <li>
          <a
            href="{pathname}page={currentPage === 1 ? 1 : currentPage - 1}"
            class="ml-0 flex h-10 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Icon icon="mdi:arrow-left" />
          </a>
        </li>
        {#each generateArray(totalPages) as page}
          <li>
            <a
              href="{pathname}page={page}"
              aria-current={currentPage === page ? 'page' : undefined}
              class="flex h-10 items-center justify-center border px-4 leading-tight {currentPage ===
              page
                ? 'bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}"
              >{page}</a
            >
          </li>
        {/each}
        <li>
          <a
            href="{pathname}page={currentPage === totalPages ? totalPages : currentPage + 1}"
            class="flex h-10 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Icon icon="mdi:arrow-right" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
{/if}
