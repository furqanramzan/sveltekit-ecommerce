<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import AppInput from '$lib/components/AppInput.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

  export let data;

  const { form, errors, delayed, enhance, message } = superForm(data.form);
</script>

<div
  class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
>
  <div
    class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
  >
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
      >
        Sign in to your account
      </h1>
      {#if $message}
        <ErrorAlert>{$message}</ErrorAlert>
      {/if}
      <form use:enhance method="post" class="space-y-4 md:space-y-6">
        <div>
          <AppInput
            input={{
              name: 'email',
              type: 'email',
              label: 'Your email',
              placeholder: 'name@company.com',
              errors: $errors.email,
              value: $form.email,
            }}
          />
        </div>
        <div>
          <AppInput
            input={{
              name: 'password',
              type: 'password',
              placeholder: '••••••••',
              errors: $errors.password,
              value: $form.password,
            }}
          />
        </div>
        <SubmitButton submitting={$delayed} wFull={true}>Sign in</SubmitButton>
      </form>
    </div>
  </div>
</div>
