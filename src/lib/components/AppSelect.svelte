<script lang="ts" context="module">
  export interface InputItem {
    name: string;
    as?: string;
    label?: string;
    /**
     * @default $name
     */
    id?: string;
    /**
     * @default Choose a $name
     */
    placeholder?: string;
    /**
     * @default true
     */
    required?: boolean;
    value?: string | number | null;
    errors?: string[];
  }
</script>

<script lang="ts">
  import { noCase } from 'text-case';

  type Option = Record<string, string | number>;
  // eslint-disable-next-line no-undef
  type Options = $$Generic<Option[]>;

  export let options: Options;
  export let valueKey: keyof Option;
  export let textKey: keyof Option;
  export let input: InputItem;
  export let value: string | number | null = '';
  if (input.value) {
    value = input.value;
  }

  $: name = input.name;
  $: as = input.as;
  $: id = input.id || name;
  $: label = input.label || `Select an ${noCase(as || name)}`;
  $: required = input.required || false;
  $: placeholder = input.placeholder || `Choose a ${noCase(as || name)}`;
  $: errors = input.errors || [];
  $: hasError = errors.length > 0;
</script>

<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  {label}
</label>
<select
  {id}
  {name}
  {required}
  {placeholder}
  bind:value
  aria-invalid={hasError}
  class="block w-full rounded-lg border p-2.5 text-sm {hasError
    ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500'
    : 'focus:border-primary-600 focus:ring-primary-600 dark:focus:border-primary-500 dark:focus:ring-primary-500 border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'}"
>
  <option value={''}>{placeholder}</option>
  {#each options as option}
    <option value={option[valueKey]}>{option[textKey]}</option>
  {/each}
</select>

{#if hasError}
  <ul class="mt-2 text-sm text-red-600 dark:text-red-500">
    {#each errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}
