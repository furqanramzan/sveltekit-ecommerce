<script lang="ts">
  import { enhance } from '$app/forms';

  export let link: string;
  export let itemId: number;
  export let headingColumn: string | number;
  export let columns: Array<string | number> = [];
</script>

<tr
  class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
>
  <th
    scope="row"
    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
  >
    {headingColumn}
  </th>
  {#each columns as column}
    <td class="px-6 py-4"> {column} </td>
  {/each}
  <slot />
  <td class="flex justify-end gap-4 px-6 py-4">
    <a
      href="/admin/auth/{link}/{itemId}/upsert"
      class="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >Edit</a
    >
    <form
      use:enhance
      class="inline-block"
      method="post"
      action="/admin/auth/{link}/{itemId}/list?/destroy"
    >
      <button
        type="submit"
        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >Delete</button
      >
    </form>
  </td>
</tr>
