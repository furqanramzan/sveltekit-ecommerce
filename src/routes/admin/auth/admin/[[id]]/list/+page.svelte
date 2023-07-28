<script lang="ts">
  import type { PageServerData } from './$types';
  import AppHeading from '$lib/components/AppHeading.svelte';
  import { enhance } from '$app/forms';
  import AppPagination from '$lib/components/AppPagination.svelte';
  import NoDataRow from '$lib/components/NoDataRow.svelte';
  import AppAddLink from '$lib/components/AppAddLink.svelte';

  export let data: PageServerData;

  $: items = data.data.items;
  $: totalPages = data.data.totalPages;
</script>

<div class="relative flex flex-col gap-y-5 overflow-x-auto">
  <div
    class="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-x-4 md:space-y-0"
  >
    <AppHeading>All admins</AppHeading>
    <div
      class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
    >
      <AppAddLink href="/admin/auth/admin/upsert">admin</AppAddLink>
    </div>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> Email </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <NoDataRow totalItems={items.length} colspan={3} />
        {#each items as { id, name, email }}
          <tr
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {name}
            </th>
            <td class="px-6 py-4"> {email} </td>
            <td class="flex justify-end gap-4 px-6 py-4">
              <a
                href="/admin/auth/admin/{id}/upsert"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a
              >
              <form
                use:enhance
                class="inline-block"
                method="post"
                action="/admin/auth/admin/{id}/list"
              >
                <button
                  type="submit"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >Delete</button
                >
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> Email </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>

  <AppPagination {totalPages} />
</div>
