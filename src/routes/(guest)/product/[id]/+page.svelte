<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import { currency } from '$lib/constants';
  import AppInput from '$lib/components/AppInput.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

  export let data: PageServerData;

  $: product = data.product;

  const { form, submitting, enhance } = superForm(data.form);
</script>

<div class="w-full py-24 lg:px-0 px-5">
  <div
    class="grid grid-cols-1 md:grid-cols-2 rounded-lg py-8 sm:px-16 mx-auto max-w-screen-lg lg:py-16 bg-white dark:bg-gray-800 px-4 gap-5"
  >
    <div class="flex justify-center">
      <img width="320" height="288" src={product.image} alt={product.name} />
    </div>
    <div>
      <h2
        class="mb-2 text-xl font-semibold leading-none text-gray-800 md:text-2xl dark:text-white"
      >
        {product.name}
      </h2>
      <p
        class="mb-4 text-xl font-extrabold leading-none text-gray-800 md:text-2xl dark:text-white"
      >
        {currency}{product.price}
      </p>
      <dl>
        <dt
          class="mb-2 font-semibold leading-none text-gray-800 dark:text-white"
        >
          Details
        </dt>
        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
          {product.description}
        </dd>
      </dl>
      <dl class="flex items-center space-x-6">
        <div>
          <dt
            class="mb-2 font-semibold leading-none text-gray-800 dark:text-white"
          >
            Category
          </dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {product.category?.name || '-'}
          </dd>
        </div>
      </dl>
      <div class="flex items-center space-x-4">
        <form method="post" class="flex gap-5" use:enhance>
          <AppInput
            input={{
              name: 'quantity',
              type: 'number',
              placeholder: '1',
              showLabel: false,
              class: '!w-14',
            }}
            bind:value={$form.quantity}
          />
          <SubmitButton submitting={$submitting}>Add to cart</SubmitButton>
        </form>
      </div>
    </div>
  </div>
</div>
