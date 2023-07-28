<script lang="ts">
  import Icon, { loadIcons } from '@iconify/svelte';
  import { Tooltip } from 'flowbite-svelte';
  import { PUBLIC_APP_NAME } from '$env/static/public';

  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'upwork',
      title: 'Upwork',
      description: 'Hire me on Upwork',
      href: 'https://upwork.com/freelancers/~016621b11e28c78a5f',
      icon: 'bx:bxl-upwork',
    },
    {
      name: 'github',
      title: 'Github',
      description: 'Star and Follow me on GitHub',
      href: 'https://github.com/furqanramzan',
      icon: 'mdi:github',
    },
  ];

  loadIcons(socialLinks.map(({ icon }) => icon));
</script>

<footer
  class="mt-auto rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:flex sm:items-center sm:justify-between sm:p-4"
>
  <p class="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
    &copy; {currentYear}
    <a href="/" class="hover:underline" target="_blank">{PUBLIC_APP_NAME}</a>. All rights reserved.
  </p>
  <div class="flex items-center justify-center space-x-1">
    {#each socialLinks as { name, title, description, href, icon }}
      <a
        {href}
        target="_blank"
        data-tooltip-target="tooltip-{name}"
        class="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <Icon {icon} class="text-xl" />
        <span class="sr-only">{title}</span>
      </a>
      <Tooltip placement="left">{description}</Tooltip>
    {/each}
  </div>
</footer>
