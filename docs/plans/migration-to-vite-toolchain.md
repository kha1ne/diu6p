# Migration Plan and Progress: CRA to Vite Toolchain

## Goal

Convert diu6p from CRA/react-scripts to the minimal-react-project style toolchain with modern Node, Yarn, Vite, Vitest, and updated project documentation.

## Completed

- Migrated package manager baseline to Yarn 4.18.1 in package metadata.
- Replaced CRA scripts with Vite/Vitest script set.
- Replaced legacy ESLint config with flat ESM config in eslint.config.mjs.
- Updated TypeScript config for Bundler module resolution and Vite/Vitest types.
- Added Vite config with:
  - React plugin
  - Vitest test setup
  - PWA plugin
  - Path aliases
- Added root index.html and removed CRA public/index.html.
- Added src/main.tsx and src/pwa.ts.
- Removed CRA-specific service worker files.
- Added .nvmrc (currently 26.13.0), synchronized with Netlify and toolchain documentation.
- Applied `ncu -u` dependency updates and the TypeScript 7.0.2 compiler / TypeScript 6 ESLint API aliases from minimal-react-project commit `730ec36`.
- Added .env.example and updated local .env structure.
- Updated ignore/config files:
  - .gitignore
  - .prettierignore
  - .prettierrc
  - .yarnrc.yml
  - removed .npmignore
- Removed obsolete public/manifest.json and build folder.
- Updated README for new toolchain.

## Validation Status

- yarn install --immutable: passing
- yarn format:check: passing
- yarn type-check: passing with native TypeScript 7.0.2; ESLint uses the TypeScript 6.0.3 API
- yarn lint:check: passing
- yarn test:ci: passing (12 tests; coverage thresholds met)
- yarn build: passing

## Notes

- Test setup uses the Vitest-specific jest-dom entry point so DOM matcher types augment Vitest assertions.
- The initial Yarn install reports an optional built-in TypeScript compatibility patch warning for the TypeScript 6 alias; immutable reinstall passes.

## Next Recommended Steps

- Move tests from src to tests for full template parity.
- Introduce route/layout folder structure only if needed by upcoming features.
- Add optional CI workflow updates to use new script names and dist output.
- Consider adding manual chunking in vite.config.ts to reduce bundle warning.
