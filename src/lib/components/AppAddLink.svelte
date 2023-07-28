<script lang="ts">
  import Icon from '@iconify/svelte';

  export let href: string;
</script>

<a
  {href}
  class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
>
  <Icon icon="mdi:plus-circle-outline" class="mr-2 text-xl" />
  Add <slot />
</a>
