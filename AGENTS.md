# Repository guidance

## Toolchain

- Use Node.js 26.8.1 from `.nvmrc` and Yarn 4.18.0 through separately installed Corepack or an equivalent Yarn shim.
- Use Yarn commands only; do not create npm or pnpm lockfiles.
- Keep TypeScript on the latest supported 6.0.x release until `typescript-eslint` supports TypeScript 7.
- Preserve the Yarn `node-modules` linker and commit `yarn.lock` when dependencies change.

## Verification

Run these checks after code or dependency changes:

```bash
yarn install --immutable
yarn format:check
yarn lint:check
yarn type-check
yarn test:ci
yarn build
```

For focused test work, use `yarn vitest run <test-file>`.

## Architecture and conventions

- This is a React 19, Material UI, and TypeScript application built with Vite.
- Define routes in `src/App.tsx`; put layouts in `src/layouts/` and pages in `src/pages/`.
- Keep aliases in `tsconfig.json` and `vite.config.ts` synchronized.
- Use `createMemoryRouter` in router tests.
- Browser environment variables must use the `VITE_` prefix. `PORT` is consumed only by Vite configuration.
- Follow the existing ESLint and Prettier configuration. Do not weaken rules or coverage thresholds to make checks pass.
- Do not edit generated `dist/`, `dev-dist/`, or `coverage/` output.
