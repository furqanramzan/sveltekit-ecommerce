<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import { currency } from '$lib/constants';
  import { noProduct } from '$lib/images';
  import { updateCartSchema } from '$lib/validation';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

  export let data: PageServerData;

  const { form, submitting, enhance } = superForm(data.form, {
    validators: updateCartSchema,
  });

  $: products = data.products;
  $: total = products.reduce(
    (total, product, index) => total + product.price * $form.quantity[index],
    0,
  );
</script>

<div class="w-full py-24">
  {#if products.length === 0}
    <div class="w-full flex flex-col items-center justify-center gap-10">
      <img loading="lazy" src={noProduct} alt="No Products Found" />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        No product in cart
      </h3>
    </div>
  {:else}
    <form
      use:enhance
      method="post"
      class="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5 xl:px-0 px-5"
    >
      <div
        class="w-full flex self-start relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
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
            {#each products as product, index}
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="w-24 p-4">
                  <a href="/product/{product.id}">
                    <img src={product.image} alt={product.name} />
                  </a>
                </td>
                <td
                  class="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                >
                  <a href="/product/{product.id}">
                    {product.name}
                  </a>
                </td>
                <td class="px-6 py-4">
                  <div>
                    <input
                      type="hidden"
                      name="product"
                      bind:value={$form.product[index]}
                    />
                    <input
                      type="number"
                      name="quantity"
                      bind:value={$form.quantity[index]}
                      class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1"
                      max={product.quantity}
                      required
                    />
                  </div>
                </td>
                <td
                  class="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                >
                  {currency}{product.price}
                </td>
                <td class="px-6 py-4">
                  <form
                    use:enhance
                    method="post"
                    action="/product/{product.id}?/remove"
                  >
                    <button
                      type="submit"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >Remove</button
                    >
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div
        class="w-full flex flex-col items-center lg:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 self-start gap-y-5"
      >
        <h5 class="mb-0 text-xl font-medium text-gray-500 dark:text-gray-400">
          Order total
        </h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">{currency}</span>
          <span class="text-5xl font-extrabold tracking-tight">{total}</span>
        </div>
        <SubmitButton wFull submitting={$submitting}>Update order</SubmitButton>
        <a
          href="/checkout"
          class="text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-200 dark:focus:ring-secondary-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >Place order</a
        >
      </div>
    </form>
  {/if}
</div>
