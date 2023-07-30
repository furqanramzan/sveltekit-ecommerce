<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import AppInput from '$lib/components/AppInput.svelte';
  import AppHeading from '$lib/components/AppHeading.svelte';
  import LightButton from '$lib/components/buttons/LightButton.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import { upsertProductSchema } from '$lib/validation';
  import AppTextarea from '$lib/components/AppTextarea.svelte';

  export let data: PageServerData;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    validators: upsertProductSchema,
    taintedMessage: null,
  });
</script>

<div class="flex flex-col gap-y-5">
  <AppHeading>Add a new product</AppHeading>
  <form method="post" use:enhance>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <AppInput
          input={{
            name: 'name',
            placeholder: 'SuperTech X1',
            errors: $errors.name,
            value: data.item?.name,
          }}
          bind:value={$form.name}
        />
      </div>
      <div>
        <AppInput
          input={{
            name: 'price',
            type: 'number',
            placeholder: '300',
            errors: $errors.price,
            value: data.item?.price,
          }}
          bind:value={$form.price}
        />
      </div>
      <div>
        <AppInput
          input={{
            name: 'quantity',
            type: 'number',
            placeholder: '3',
            errors: $errors.quantity,
            value: data.item?.quantity,
          }}
          bind:value={$form.quantity}
        />
      </div>
      <div class="col-span-2">
        <AppTextarea
          input={{
            name: 'description',
            placeholder:
              "Introducing the SuperTech X1 - your all-in-one solution for cutting-edge performance and seamless connectivity. With a lightning-fast chipset, stunning display, and advanced camera system, it's the ultimate tech companion",
            errors: $errors.description,
            value: data.item?.description,
          }}
          bind:value={$form.description}
        />
      </div>
    </div>
    <div class="mt-4 flex gap-x-3 sm:mt-6">
      <SubmitButton loading={$submitting}>Add product</SubmitButton>
      <a href="/admin/auth/product/list"><LightButton>All products</LightButton> </a>
    </div>
  </form>
</div>
