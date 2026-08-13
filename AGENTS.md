# Agents & Commands Guide for csfin-monorepo

This guide documents common commands and workflows for the csfin-monorepo Nx Monorepo.

## Quick Reference

### Build Commands

**Build all projects:**

```bash
npx nx run-many --targets=build
```

**Build a specific project:**

```bash
npx nx build csfin-rest-api
npx nx build csfin-web-app
```

**Build with cache invalidation:**

```bash
npx nx run-many --targets=build --skip-nx-cache
```

### Test Commands

**Run tests for all projects:**

```bash
npx nx run-many --targets=test
```

**Run tests for a specific project:**

```bash
npx nx test csfin-rest-api
npx nx test csfin-web-app
```

**Run tests in watch mode:**

```bash
npx nx test <project> --watch
```

**Run tests with coverage:**

```bash
npx nx run-many --targets=test --codeCoverage
```

### Lint Commands

**Lint all projects:**

```bash
npx nx run-many --targets=lint
```

**Lint a specific project:**

```bash
npx nx lint csfin-rest-api
npx nx lint csfin-web-app
```

### Development Commands

**Start the REST API development server:**

```bash
npx nx serve csfin-rest-api
```

**Start the web app development server:**

```bash
npx nx serve csfin-web-app
```

### Dependency Graph

**View the project dependency graph:**

```bash
npx nx graph
```

**Show affected projects from changes:**

```bash
npx nx affected --targets=build
npx nx affected --targets=test
npx nx affected --targets=lint
```

## Project Structure

### Apps

- **csfin-rest-api**: NestJS REST API server
  - Build tool: Webpack
  - Package: `apps/csfin-rest-api`

- **csfin-web-app**: React web application
  - Build tool: Vite
  - Package: `apps/csfin-web-app`

### Libraries (Shared Code)

- **core**: Core business logic and types
  - Package: `libs/core`
  - Exports: DTOs, types, utilities

- **core-ui**: Shared UI components
  - Package: `libs/core-ui`
  - Exports: React components

## Common Workflows

### Full Build Pipeline

```bash
# Clean, lint, test, and build everything
npx nx run-many --targets=lint
npx nx run-many --targets=test
npx nx run-many --targets=build
```

### Targeted Development

```bash
# Make changes to a specific library and test affected projects
npx nx affected --targets=test --base=main
npx nx affected --targets=build --base=main
```

### Cache Management

```bash
# Clear the Nx cache
npx nx reset
```

### Debug a Build

```bash
# Run a specific target with verbose output
npx nx build csfin-rest-api --verbose
```

## Useful Nx Plugins

- **@nx/nest**: NestJS support
- **@nx/react**: React support
- **@nx/vite**: Vite build tool support
- **@nx/webpack**: Webpack support
- **@nx/eslint**: ESLint support
- **@nx/jest**: Jest testing support

## Configuration Files

- **nx.json**: Main Nx configuration
- **tsconfig.base.json**: Base TypeScript configuration
- **eslint.config.mjs**: ESLint configuration (flat config format)
- **jest.config.ts**: Jest configuration
- **vitest.workspace.ts**: Vitest configuration (if using Vitest)

## Continuous Integration

For CI/CD pipelines, consider:

```bash
# Run all affected tests and builds from last successful commit
npx nx affected --targets=test,build --base=HEAD~1
```

## Troubleshooting

**Build errors related to ESLint configuration:**

- The root `eslint.config.mjs` uses ESLint's flat config format
- Ensure no duplicate plugin definitions (especially `@typescript-eslint`)
- Run `npx nx reset` to clear cache and rebuild

**Dependencies not being recognized:**

- Use `npx nx graph` to verify library dependencies are correctly configured
- Check `project.json` files for proper imports

**Cache-related issues:**

- Clear cache: `npx nx reset`
- Skip cache: Add `--skip-nx-cache` to any command
