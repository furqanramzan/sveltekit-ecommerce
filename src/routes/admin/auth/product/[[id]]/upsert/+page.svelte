<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import AppInput from '$lib/components/AppInput.svelte';
  import { upsertProductSchema } from '$lib/validation';
  import AppTextarea from '$lib/components/AppTextarea.svelte';
  import AppForm from '$lib/components/AppForm.svelte';
  import AppFileInput from '$lib/components/AppFileInput.svelte';
  import { page } from '$app/stores';
  import AppSelect from '$lib/components/AppSelect.svelte';

  export let data: PageServerData;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    validators: upsertProductSchema,
    taintedMessage: null,
  });
</script>

<AppForm
  {enhance}
  enctype="multipart/form-data"
  name={{ singular: 'product' }}
  submitting={$submitting}
>
  <div class="sm:col-span-2">
    <AppSelect
      input={{
        name: 'categoryId',
        as: 'category',
        errors: $errors.categoryId,
        value: data.item?.categoryId,
      }}
      bind:value={$form.categoryId}
      options={data.categories}
      valueKey="id"
      textKey="name"
    />
  </div>
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
  <div class="col-span-2">
    <AppFileInput
      input={{
        name: 'image',
        type: 'file',
        min: 5,
        multiple: true,
        required: !$page.params.id,
        errors: $errors.image,
      }}
    />
  </div>
</AppForm>
