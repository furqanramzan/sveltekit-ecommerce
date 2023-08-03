<script>
  import AppLogo from '$lib/components/AppLogo.svelte';
  import AppSocialLinks from '$lib/components/AppSocialLinks.svelte';
</script>

<footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
  <div class="mx-auto max-w-screen-xl text-center">
    <div class="flex justify-center items-center">
      <AppLogo />
    </div>
    <p class="my-6 text-gray-500 dark:text-gray-400">
      A powerful, open-source E-commerce project for seamless online shopping experiences, powered
      by SvelteKit.
    </p>
    <AppSocialLinks />
  </div>
</footer>
