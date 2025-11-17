# Contributing to the QA Test Suite

Thank you for contributing to Polygon’s UI automation suite!  
This document explains how to add new tests, maintain code quality, and follow the project structure.

---

## Getting Started

### Install dependencies

```bash
npm install
npx playwright install --with-deps
````

### Environment Variables

Create a `.env` file at the repo root:

```
STAKING_URL=https://xxxxxxx-staging.polygon.technology/
VALIDATOR_URL=https://xxxxxxx-staging.polygon.technology/
```

---

## Project Structure

```
projects/
  staking-ui/
    tests/
    fixtures/
    config.ts

  validator-ui/
    tests/
    fixtures/
    config.ts

shared/
  helpers/
  selectors/
  utils/
```

---

## Writing Tests

### 1. Create test files under:

```
projects/<project-name>/tests/
```

Example:

```
projects/staking-ui/tests/staking.spec.ts
```

### 2. Test Template

```ts
import { test, expect } from '@playwright/test';

test('@smoke staking page loads', async ({ page }) => {
  await page.goto(process.env.STAKING_URL!);
  await expect(page.getByText('Staking')).toBeVisible();
});
```

### 3. Use Tags

* `@smoke` – fast daily checks
* `@regression` – nightly/full-suite tests
* `@critical` – business-critical flows

### 4. Use Stable Selectors

Prefer attributes like:

```html
<div data-testid="staking-amount"></div>
```

In tests:

```ts
page.getByTestId('staking-amount')
```

Avoid brittle CSS selectors.

---

## Fixtures & Helpers

* Put reusable login/navigation/wallet setup logic in:

  ```
  projects/<project>/fixtures/
  ```
* Put shared selectors/helpers in:

  ```
  shared/
  ```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run for a single project

```bash
npx playwright test --project=staking-ui-chromium
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run by tag

```bash
npx playwright test --grep "@smoke"
```

---

## Debugging

### Show HTML report

```bash
npx playwright show-report
```

### Show trace

```bash
npx playwright show-trace trace.zip
```

---

## Code Quality

Before submitting PRs:

* Run tests locally
* Use consistent naming
* Avoid unnecessary waits
* Prefer fixtures over repeated setup code
* Keep tests short and readable

---

## Pull Request Checklist

* [ ] Tests pass locally
* [ ] New tests use stable selectors
* [ ] Tags are used correctly
* [ ] No hardcoded URLs (use env vars)
* [ ] CI workflow passes
* [ ] Artifacts are uploaded correctly
