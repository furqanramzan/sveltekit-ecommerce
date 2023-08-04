<script>
  import '$lib/css/app.css';
  import Footer from './components/Footer.svelte';
  import Navbar from './components/Navbar.svelte';
</script>

<div class="w-full flex flex-col min-h-screen">
  <Navbar />
  <slot />
  <Footer />
</div>
