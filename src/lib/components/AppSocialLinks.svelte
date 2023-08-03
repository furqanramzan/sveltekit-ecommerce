<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Tooltip } from 'flowbite-svelte';

  export const socialLinks = [
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
</script>

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
    <Tooltip>{description}</Tooltip>
  {/each}
</div>
