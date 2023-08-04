<script lang="ts">
  import type { PageServerData } from './$types';
  import { currency } from '$lib/constants';
  import { noProduct } from '$lib/images';

  export let data: PageServerData;

  $: products = data.products;
</script>

<div class="w-full py-24">
  {#if products.length === 0}
    <div class="w-full flex flex-col items-center justify-center gap-10">
      <img loading="lazy" src={noProduct} alt="No Products Found" />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">No product in cart</h3>
    </div>
  {:else}
    <div class="max-w-screen-xl mx-auto flex flex-col items-center lg:flex-row gap-5 xl:px-0 px-5">
      <div class="w-full flex flex-grow relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3"> Product </th>
              <th scope="col" class="px-6 py-3"> Qty </th>
              <th scope="col" class="px-6 py-3"> Price </th>
              <th scope="col" class="px-6 py-3"> Action </th>
            </tr>
          </thead>
          <tbody>
            {#each products as product}
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="w-24 p-4">
                  <img src={product.image} alt={product.name} />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td class="px-6 py-4">
                  <div>
                    <input
                      type="number"
                      id="first_product"
                      class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1"
                      required
                    />
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {currency}{product.price}
                </td>
                <td class="px-6 py-4">
                  <a href="/" class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >Remove</a
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div
        class="w-full flex flex-col items-center lg:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 self-start gap-y-5"
      >
        <h5 class="mb-0 text-xl font-medium text-gray-500 dark:text-gray-400">Order total</h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">{currency}</span>
          <span class="text-5xl font-extrabold tracking-tight">49</span>
        </div>
        <button
          type="button"
          class="text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-200 dark:focus:ring-secondary-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >Update order</button
        >
        <button
          type="button"
          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 dark:focus:ring-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >Place order</button
        >
      </div>
    </div>
  {/if}
</div>
