# SvelteKit E-commerce - [Live Demo](https://sveltekit-ecommerce-furqanramzan.vercel.app)

## Setup

### Install pnpm

Install pnpm globally using the following command, which is a performant node package manager.

```sh
npm install -g pnpm
```

### Installing dependencies

Make sure to install dependencies using:

```sh
pnpm install
```

Make a copy of the environment variables file.

```bash
cp .env.example .env
```

## Developing

To start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

## Previewing

You can preview the production build with:

```sh
pnpm run preview
```

## Type Checking

To validate the definitions of the types:

```bash
pnpm run typecheck
```

## Linting

Run the following command to lint the application.

```bash
pnpm run lint
```

## Deploying

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## License

SvelteKit E-commerce is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
