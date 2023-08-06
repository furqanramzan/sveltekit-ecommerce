<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import { currency } from '$lib/constants';
  import { createOrderSchema } from '$lib/validation';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import AppInput from '$lib/components/AppInput.svelte';

  export let data: PageServerData;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    validators: createOrderSchema,
  });

  $: cart = data.cart;
  $: products = data.products;
  $: total = products.reduce(
    (total, product) => total + product.price * (cart.get(product.id) || 1),
    0,
  );
</script>

<div class="w-full py-24">
  <form
    use:enhance
    method="post"
    class="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5 xl:px-0 px-5"
  >
    <div
      class="w-full flex self-start p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="w-full grid gap-4 sm:gap-6">
        <div>
          <AppInput
            bind:value={$form.name}
            input={{ name: 'name', errors: $errors.name }}
          />
        </div>
        <div>
          <AppInput
            bind:value={$form.email}
            input={{ name: 'email', type: 'email', errors: $errors.email }}
          />
        </div>
        <div>
          <AppInput
            bind:value={$form.phone}
            input={{ name: 'phone', errors: $errors.phone }}
          />
        </div>
        <div>
          <AppInput
            bind:value={$form.city}
            input={{ name: 'city', errors: $errors.city }}
          />
        </div>
        <div>
          <AppInput
            bind:value={$form.address}
            input={{ name: 'address', errors: $errors.address }}
          />
        </div>
        <div>
          <SubmitButton submitting={$submitting}>Confirm order</SubmitButton>
        </div>
      </div>
    </div>

    <div
      class="w-full self-start max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <h5
          class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          Order summary
        </h5>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each products as product}
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    {product.name}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Quantity:
                    <strong>
                      {cart.get(product.id) || 1}
                    </strong>
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  {currency}{product.price * (cart.get(product.id) || 1)}
                </div>
              </div>
            </li>
          {/each}
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  <strong>Order total</strong>
                </p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
              >
                {currency}{total}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </form>
</div>
