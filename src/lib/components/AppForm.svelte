<script lang="ts">
  import type { superForm } from 'sveltekit-superforms/client';
  import AppHeading from '$lib/components/AppHeading.svelte';
  import LightButton from '$lib/components/buttons/LightButton.svelte';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

  export let enhance: ReturnType<typeof superForm>['enhance'];
  export let submitting: boolean;
  export let name: { plural?: string; singular: string };
  if (!name.plural) {
    name.plural = `${name.singular}s`;
  }
</script>

<div class="flex flex-col gap-y-5">
  <AppHeading>Add a new {name.singular}</AppHeading>
  <form method="post" use:enhance>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <slot />
    </div>
    <div class="mt-4 flex gap-x-3 sm:mt-6">
      <SubmitButton {submitting}>Add {name.singular}</SubmitButton>
      <a href="/admin/auth/{name.singular}/list">
        <LightButton>All {name.plural}</LightButton>
      </a>
    </div>
  </form>
</div>
