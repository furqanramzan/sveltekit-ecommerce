<script lang="ts">
  import '$lib/css/app.css';
  import Navbar from '$admin/components/Navbar.svelte';
  import Footer from '$admin/components/Footer.svelte';
</script>

<div>
  <Navbar />
  <section class="bg-gray-50 dark:bg-gray-900">
    <slot />
  </section>
  <div class="fixed bottom-0 w-full">
    <Footer />
  </div>
</div>
