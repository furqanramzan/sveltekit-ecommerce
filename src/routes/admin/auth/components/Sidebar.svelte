<script lang="ts">
  import { loadIcons } from '@iconify/svelte';
  import Link, { type LinkItem } from './Link.svelte';

  export let links: LinkItem[];

  loadIcons(links.map(({ icon }) => icon));
</script>

<aside
  class="fixed left-0 top-0 z-40 mt-16 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 md:translate-x-0 py-6"
  aria-label="Sidebar"
>
  <div class="h-full overflow-y-auto bg-white px-3 dark:bg-gray-800">
    <ul class="space-y-2 font-medium">
      {#each links as link}
        <Link {link} />
      {/each}
    </ul>
  </div>
</aside>
