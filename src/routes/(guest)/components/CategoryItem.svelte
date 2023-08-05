<script lang="ts">
  import { page } from '$app/stores';
  import type { Select } from '$lib/server/repositories/category-repository';
  import { getParamsString } from '$lib/utils';

  export let category: Pick<Select, 'id' | 'name' | 'image'>;
  let href: string;
  $: {
    let categoryParam: Record<string, string> | undefined;

    if (category.name !== 'All') {
      categoryParam = { category: category.id.toString() };
    }

    const allParams = getParamsString(
      $page.url.searchParams,
      ['page', 'category'],
      categoryParam,
    );
    href = allParams ? `?${allParams}` : $page.url.pathname;
  }
</script>

<a
  {href}
  class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-10"
>
  <div class="flex flex-col items-center">
    <img
      loading="lazy"
      width="48"
      height="48"
      class="mb-3"
      src={category.image}
      alt={category.name}
    />
    <span class="text-sm font-bold text-gray-900 dark:text-white">
      {category.name}
    </span>
  </div>
</a>
