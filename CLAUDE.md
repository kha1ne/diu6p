# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task                    | Command                                          |
| ----------------------- | ------------------------------------------------ |
| Dev server              | `yarn dev`                                       |
| Build                   | `yarn build`                                     |
| Preview build           | `yarn preview`                                   |
| Lint                    | `yarn lint` (or `yarn lint:fix` to auto-fix)     |
| Format                  | `yarn format` (or `yarn format:check` to verify) |
| Type check              | `yarn type-check`                                |
| Run all tests           | `yarn test:run`                                  |
| Run tests in watch mode | `yarn test:watch`                                |
| Run a single test       | `yarn vitest run tests/App.test.tsx`             |
| Test coverage           | `yarn test:coverage`                             |

Package manager is **Yarn 4** (Berry) with `node-modules` linker. Use `yarn add` / `yarn add -D`, not npm.

## Architecture

React 19 + TypeScript app built with Vite. Generates 6-player Dune Imperium: Uprising table setups.

### Routing

React Router v8 with `createBrowserRouter`. Routes defined in `src/App.tsx`. Layout in `src/layouts/AppLayout.tsx`, pages in `src/pages/`. Use `createMemoryRouter` in tests instead of `createBrowserRouter`.

### Path aliases

Configured in both `tsconfig.json` and `vite.config.ts`: `@components/*`, `@context/*`, `@hooks/*`, `@layouts/*`, `@pages/*`, `@services/*`, `@styles/*`, `@types/*`, `@utils/*` — all resolve to `src/<folder>/*`.

### Testing

Vitest with jsdom environment. Setup file at `tests/setupTests.ts` imports `@testing-library/jest-dom`. Tests live in `tests/` or co-located as `*.test.{ts,tsx}` in `src/`.

### Code style

- ESLint flat config (`eslint.config.mjs`) with `typescript-eslint` type-checked rules, `react-hooks`, `react-refresh`, `jsx-a11y`, and `simple-import-sort`
- Prettier: 150 char line width, 2-space indent, trailing commas (es5), JSX single quotes, no arrow parens
- Imports must be sorted (enforced by `simple-import-sort` — do not use Prettier import sorting)
- Max line length: 150 chars (URLs and strings exempt)
- Unused vars prefixed with `_` are allowed

### Environment variables

Browser-accessible env vars must be prefixed with `VITE_` (accessed via `import.meta.env.VITE_*`). See `.env.example` for available variables. `PORT` controls dev server port (default 5173).
