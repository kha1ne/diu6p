# Migration Plan and Progress: CRA to Vite Toolchain

## Goal

Convert diu6p from CRA/react-scripts to the minimal-react-project style toolchain with modern Node, Yarn, Vite, Vitest, and updated project documentation.

## Completed

- Migrated package manager baseline to Yarn 4.18.0 in package metadata.
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
- Added .nvmrc (26.7.0).
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

- yarn type-check: passing
- yarn lint:check: passing
- yarn test:run: passing
- yarn build: passing

## Notes

- Vitest prints a jsdom warning for HTMLMediaElement.play not being implemented; tests still pass.
- Vite build warns about a large JS chunk. This is non-blocking and can be improved with code-splitting later.

## Next Recommended Steps

- Move tests from src to tests for full template parity.
- Introduce route/layout folder structure only if needed by upcoming features.
- Add optional CI workflow updates to use new script names and dist output.
- Consider adding manual chunking in vite.config.ts to reduce bundle warning.
