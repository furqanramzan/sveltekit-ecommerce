<script lang="ts">
  import { DarkMode } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import AppLogo from '$lib/components/AppLogo.svelte';

  $: category = $page.url.searchParams.get('category');
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-800">
  <div
    class="max-w-screen-xl flex flex-col gap-y-4 lg:flex-row items-center justify-between mx-auto p-4"
  >
    <AppLogo />
    <div class="items-center justify-between w-full flex md:w-auto">
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <li>
          <a
            href="/"
            class="block py-2 pl-3 pr-4 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500"
            aria-current="page">Home</a
          >
        </li>
        <li>
          <a
            href="/"
            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >About</a
          >
        </li>
        <li>
          <DarkMode
            btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"
          />
        </li>
      </ul>
    </div>

    <form>
      <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input type="hidden" name="category" value={category} />
        <input
          value={$page.url.searchParams.get('name')}
          name="name"
          type="search"
          class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search"
        />
        <button
          type="submit"
          class="absolute top-0 right-0 px-2.5 h-full text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</nav>
