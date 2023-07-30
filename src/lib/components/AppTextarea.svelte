<script lang="ts" context="module">
  export interface InputItem {
    name: string;
    label?: string;
    /**
     * @default $name
     */
    id?: string;
    /**
     * @default Type $name here
     */
    placeholder?: string;
    /**
     * @default 5
     */
    rows?: number;
    /**
     * @default true
     */
    required?: boolean;
    value?: string | number;
    errors?: string[];
  }
</script>

<script lang="ts">
  import { noCase, titleCase } from 'text-case';

  export let input: InputItem;
  export let value: string | number = '';
  if (input.value) {
    value = input.value;
  }

  $: name = input.name;
  $: id = input.id || name;
  $: label = input.label || titleCase(name);
  $: required = input.required || false;
  $: rows = input.rows || 5;
  $: placeholder = input.placeholder || `Type ${noCase(name)} here`;
  $: errors = input.errors || [];
  $: hasError = errors.length > 0;
</script>

<label for={id} class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
<textarea
  {id}
  {rows}
  {name}
  {required}
  {placeholder}
  bind:value
  aria-invalid={hasError}
  class="block w-full rounded-lg border {hasError
    ? 'border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500'
    : 'focus:border-primary-600 focus:ring-primary-600 dark:focus:border-primary-500 dark:focus:ring-primary-500 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'}"
/>
{#if hasError}
  <ul class="mt-2 text-sm text-red-600 dark:text-red-500">
    {#each errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}
