<script lang="ts">
  import '$lib/css/app.css';
  import type { LinkItem } from './components/Link.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Footer from '$admin/components/Footer.svelte';
  import Navbar from '$admin/components/Navbar.svelte';

  const links: LinkItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/auth/dashboard',
      icon: 'mdi:view-dashboard-variant',
    },
    {
      name: 'Admins',
      active: '/admin/auth/admin',
      href: '/admin/auth/admin/list',
      icon: 'mdi:account-multiple',
    },
    {
      name: 'Categories',
      active: '/admin/auth/category',
      href: '/admin/auth/category/list',
      icon: 'mdi:layers-triple',
    },
    {
      name: 'Products',
      active: '/admin/auth/product',
      href: '/admin/auth/product/list',
      icon: 'mdi:shopping',
    },
  ];
</script>

<div>
  <Navbar />

  <Sidebar {links} />

  <div
    class="flex min-h-screen flex-col gap-y-5 bg-gray-100 p-6 dark:bg-gray-900 md:ml-64"
  >
    <section class="mt-16 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <slot />
    </section>

    <Footer />
  </div>
</div>
