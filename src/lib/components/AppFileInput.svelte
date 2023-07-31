<script lang="ts" context="module">
  import type { HTMLInputTypeAttribute } from 'svelte/elements';

  export interface InputItem {
    name: string;
    label?: string;
    /**
     * @default text
     */
    type?: HTMLInputTypeAttribute;
    /**
     * @default $name
     */
    id?: string;
    /**
     * @default true
     */
    required?: boolean;
    /**
     * @default 0
     */
    min?: number;
    /**
     * @default false
     */
    multiple?: boolean;
    value?: string | number;
    errors?: string[];
  }
</script>

<script lang="ts">
  import { titleCase } from 'text-case';

  export let input: InputItem;
  export let value: string | number = '';
  if (input.value) {
    value = input.value;
  }

  $: name = input.name;
  $: min = input.min || 0;
  $: multiple = input.multiple || false;
  $: id = input.id || name;
  $: label = input.label || titleCase(name);
  $: required = input.required || false;
  $: errors = input.errors || [];
  $: hasError = errors.length > 0;
</script>

<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  {label}
</label>
<input
  {id}
  {min}
  {name}
  {multiple}
  {required}
  aria-invalid={hasError}
  class="block w-full text-sm border rounded-lg cursor-pointer focus:outline-none {hasError
    ? 'border-red-500 text-red-900 dark:border-red-500 dark:bg-gray-700 dark:text-red-500'
    : 'text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'}"
  type="file"
/>
{#if hasError}
  <ul class="mt-2 text-sm text-red-600 dark:text-red-500">
    {#each errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}
