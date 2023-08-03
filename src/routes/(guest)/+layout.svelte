<script>
  import Footer from './components/Footer.svelte';
  import Navbar from './components/Navbar.svelte';
</script>

<div class="w-full">
  <Navbar />
  <slot />
  <Footer />
</div>
