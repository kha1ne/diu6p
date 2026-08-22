# Dune Imperium: Uprising 6P Table Creator

A React + TypeScript application for generating 6-player Dune Imperium: Uprising table setups, now running on a modern Vite + Yarn 4 toolchain.

Live app: https://diu6p.netlify.app/

## Stack

- React 19
- TypeScript 6
- Vite 8
- Vitest + Testing Library
- ESLint flat config + Prettier
- vite-plugin-pwa for service worker and web manifest generation

## Prerequisites

- Node.js 24 LTS (see [.nvmrc](.nvmrc))
- Corepack enabled
- Yarn 4

## Installation

```bash
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
yarn type-check
yarn lint:check
yarn test:run
yarn build
```

## License

MIT. See [LICENSE](LICENSE).
