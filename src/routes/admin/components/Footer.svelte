<script lang="ts">
  import { PUBLIC_APP_NAME } from '$env/static/public';
  import AppSocialLinks from '$lib/components/AppSocialLinks.svelte';

  const currentYear = new Date().getFullYear();
</script>

<footer
  class="mt-auto rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:flex sm:items-center sm:justify-between sm:p-4"
>
  <p class="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
    &copy; {currentYear}
    <a href="/" class="hover:underline" target="_blank">{PUBLIC_APP_NAME}</a>. All rights reserved.
  </p>
  <AppSocialLinks />
</footer>
