# Dune Imperium: Uprising 6P Table Creator

A React + TypeScript application for generating 6-player Dune Imperium: Uprising table setups, now running on a modern Vite + Yarn 4 toolchain.

Live app: https://diu6p.netlify.app/

## Stack

- React 19
- TypeScript 7.0.2 native compiler, with the TypeScript 6 API retained for ESLint
- Vite 8
- Vitest + Testing Library
- ESLint flat config + Prettier
- vite-plugin-pwa for service worker and web manifest generation

## Prerequisites

- Node.js 26.13.0 Current (pinned in [.nvmrc](.nvmrc)); Node.js 24+ is supported
- Corepack installed separately and enabled (Node.js 25+ no longer bundles it)
- Yarn 4.18.1

## Installation

```bash
npm install --global corepack
corepack enable
yarn install
```

Copy environment defaults if needed:

```bash
cp .env.example .env
```

## Scripts

- yarn dev: Start Vite dev server.
- yarn build: Build production assets to dist.
- yarn preview: Preview production build locally.
- yarn type-check: Run TypeScript checks without emitting files.
- yarn lint: Run ESLint.
- yarn lint:check: Run ESLint with zero-warning policy.
- yarn lint:fix: Auto-fix lint issues.
- yarn format: Format files with Prettier.
- yarn format:check: Check formatting.
- yarn test: Run Vitest in watch mode.
- yarn test:run: Run tests once.
- yarn test:watch: Explicit Vitest watch mode.
- yarn test:coverage: Run tests with coverage.
- yarn test:ci: CI-oriented test run with coverage and verbose output.

## Environment Variables

Build-time variables (used by Vite config):

- NODE_ENV
- PORT

Client runtime variables (must be prefixed with VITE_):

- VITE_APP_NAME
- VITE_LOG_LEVEL
- VITE_LOG_TIMESTAMP

See [.env.example](.env.example) for defaults.

## PWA

PWA support is handled through vite-plugin-pwa. During build, Vite generates:

- dist/manifest.webmanifest
- dist/sw.js
- dist/workbox-*.js

## Project Structure

```text
diu6p/
├── public/                 # Static assets (icons, images)
├── src/                    # App source
│   ├── assets/             # Images and sound effects
│   ├── App.tsx             # Main UI composition
│   ├── main.tsx            # Vite app entrypoint
│   ├── pwa.ts              # PWA runtime registration
│   ├── setupTests.ts       # Vitest/Testing Library setup
│   └── *.test.tsx          # Component tests
├── index.html              # Root Vite HTML entry
├── vite.config.ts          # Vite + Vitest + PWA config
├── tsconfig.json           # TypeScript config
└── package.json            # Scripts and dependencies
```

## Verification

Recommended local validation sequence:

```bash
yarn install --immutable
yarn format:check
yarn lint:check
yarn type-check
yarn test:ci
yarn build
```

## TypeScript 7 and ESLint compatibility

`yarn type-check` runs the native TypeScript 7.0.2 compiler supplied by `@typescript/native` (`npm:typescript@7.0.2`).
ESLint imports the TypeScript 6 API through `typescript`, aliased to `@typescript/typescript6` (`^6.0.2`),
matching the side-by-side setup in `minimal-react-project`.
Typed linting remains enabled and evaluates types using TypeScript 6; `yarn type-check` validates them using TypeScript 7.
The configured editor SDK also uses TypeScript 6. Keep this compatibility setup until `typescript-eslint` supports TypeScript 7.

## License

MIT. See [LICENSE](LICENSE).
