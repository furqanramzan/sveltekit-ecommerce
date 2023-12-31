<script lang="ts">
  import '$lib/css/app.css';
  import CategoryItem from './components/CategoryItem.svelte';
  import AddToCart from './components/AddToCart.svelte';
  import AppPagination from '$lib/components/AppPagination.svelte';
  import { currency } from '$lib/constants';
  import { noDataFound } from '$lib/images';
  import { getTitle } from '$lib/utils';

  export let data;

  $: categories = data.categories;
  $: products = data.products;
  $: cart = data.cart;
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
        <img loading="lazy" src={noDataFound} alt="No Products Found" />
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
                <a href="/product/{product.id}">
                  <img
                    loading="lazy"
                    width="320"
                    height="288"
                    class="p-8 rounded-t-lg"
                    src={product.image}
                    alt={product.name}
                  />
                </a>
              </div>
              <div class="px-5 pb-5 flex flex-col gap-4">
                <a href="/product/{product.id}">
                  <h5
                    class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
                  >
                    {product.name}
                  </h5>
                </a>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-gray-900 dark:text-white"
                    >{currency}{product.price}</span
                  >
                  <AddToCart isInCart={cart.has(product.id)} {product} />
                </div>
              </div>
            </div>
          {/each}
        </div>
        <AppPagination
          totalPages={products.totalPages}
          class="flex justify-center"
        />
      </div>
    {/if}
  </div>
</div>

<svelte:head>
  <title>{getTitle()}</title>
  <meta
    name="description"
    content="Unleash the shopping bliss! SvelteKit-powered eCommerce for fast, secure, and delightful retail therapy. Discover now!"
  />
</svelte:head>
