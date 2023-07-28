<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import AppInput from '$lib/components/AppInput.svelte';
  import AppHeading from '$lib/components/AppHeading.svelte';
  import LightButton from '$lib/components/buttons/LightButton.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import { upsertAdminSchema } from '$lib/validation';

  export let data: PageServerData;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    validators: upsertAdminSchema,
    taintedMessage: null,
  });
</script>

<div class="flex flex-col gap-y-5">
  <AppHeading>Add a new admin</AppHeading>
  <form method="post" use:enhance>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <AppInput
          input={{
            name: 'name',
            placeholder: 'John Doe',
            errors: $errors.name,
            value: data.item?.name,
          }}
          bind:value={$form.name}
        />
      </div>
      <div>
        <AppInput
          input={{
            name: 'email',
            placeholder: 'name@company.com',
            errors: $errors.email,
            value: data.item?.email,
          }}
          bind:value={$form.email}
        />
      </div>
      <div>
        <AppInput
          input={{
            name: 'password',
            type: 'password',
            placeholder: '••••••••',
            errors: $errors.password,
          }}
          bind:value={$form.password}
        />
      </div>
    </div>
    <div class="mt-4 flex gap-x-3 sm:mt-6">
      <SubmitButton loading={$submitting}>Add admin</SubmitButton>
      <a href="/admin/auth/admin/list"><LightButton>All admins</LightButton> </a>
    </div>
  </form>
</div>
