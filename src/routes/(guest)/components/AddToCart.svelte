<script lang="ts">
  import { enhance } from '$app/forms';
  import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import type { Select } from '$lib/server/repositories/product-repository';

  export let isInCart: boolean;
  export let product: Pick<Select, 'id'>;
</script>

<form
  method="post"
  action="/product/{product.id}?/{isInCart ? 'remove' : 'add'}"
  class="flex gap-5"
  use:enhance
>
  {#if !isInCart}
    <input type="hidden" name="quantity" value="1" />
  {/if}
  <SubmitButton>
    {#if isInCart}
      Remove from cart
    {:else}
      Add to cart
    {/if}
  </SubmitButton>
</form>
