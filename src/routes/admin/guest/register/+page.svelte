<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageServerData } from './$types';
  import AppInput from '$lib/components/AppInput.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import { upsertAdminSchema } from '$lib/validation';

  export let data: PageServerData;

  const { form, errors, delayed, enhance } = superForm(data.form, {
    validators: upsertAdminSchema,
  });
</script>

<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
  <div
    class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
  >
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
      >
        Create your account
      </h1>
      <form use:enhance method="post" class="space-y-4 md:space-y-6">
        <div>
          <AppInput
            input={{
              name: 'name',
              label: 'Your name',
              placeholder: 'John doe',
              errors: $errors.name,
            }}
            bind:value={$form.name}
          />
        </div>
        <div>
          <AppInput
            input={{
              name: 'email',
              type: 'email',
              label: 'Your email',
              placeholder: 'name@company.com',
              errors: $errors.email,
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
        <SubmitButton loading={$delayed} wFull={true}>Sign up</SubmitButton>
      </form>
    </div>
  </div>
</div>
