<script lang="ts">
  import '$lib/css/app.css';
  import type { PageServerData } from './$types';
  import CategoryItem from './components/CategoryItem.svelte';
  import AppPagination from '$lib/components/AppPagination.svelte';
  import { currency } from '$lib/constants';
  import { noDataFound } from '$lib/images';

  export let data: PageServerData;

  $: categories = data.categories;
  $: products = data.products;
</script>

<div class="grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-x-5 p-5">
  <div class="w-full">
    <div class="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-5">
      {#each categories as category}
        <CategoryItem {category} />
      {/each}
    </div>
  </div>
  <div class="w-full col-span-3">
    {#if products.items.length === 0}
      <div class="w-full flex flex-col items-center justify-center gap-10">
        <img src={noDataFound} alt="No Products Found" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          Currently, no product available with specified criteria.
        </h3>
      </div>
    {:else}
      <div class="gap-16 flex flex-col">
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {#each products.items as product}
            <div
              class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="w-full text-center">
                <a href="/">
                  <img
                    class="p-8 rounded-t-lg w-80 h-72"
                    width="320"
                    height="288"
                    src={product.image}
                    alt={product.name}
                  />
                </a>
              </div>
              <div class="px-5 pb-5 flex flex-col gap-4">
                <a href="/">
                  <h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                  </h5>
                </a>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-gray-900 dark:text-white"
                    >{currency}{product.price}</span
                  >
                  <a
                    href="/"
                    class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
                    >Add to cart</a
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
        <AppPagination totalPages={products.totalPages} class="flex justify-center" />
      </div>
    {/if}
  </div>
</div>
