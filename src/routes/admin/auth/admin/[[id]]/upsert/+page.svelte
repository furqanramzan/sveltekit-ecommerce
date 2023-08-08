<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import AppInput from '$lib/components/AppInput.svelte';
  import AppForm from '$lib/components/AppForm.svelte';
  import { upsertAdminSchema } from '$lib/validation';

  export let data;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    validators: upsertAdminSchema,
    taintedMessage: null,
  });
</script>

<AppForm name={{ singular: 'product' }} {enhance} submitting={$submitting}>
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
</AppForm>
