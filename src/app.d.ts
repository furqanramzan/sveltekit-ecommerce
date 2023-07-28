import type { JwtData } from '$lib/authentication/jwt';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      admin: JwtData;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
