# QA End-to-End Test Suite

This repository contains the end-to-end (E2E) automation suite for Polygon’s web applications, built using **Playwright**.
The test suite supports **multiple UI projects**, runs **nightly** via GitHub Actions, and uses environment-specific URLs managed via **GitHub Secrets**.

---

##  Features

* **Playwright test runner** with TypeScript
* **Multi-project architecture** (Staking UI, Validator UI,  etc.)
* **Per-project configuration** (baseURL, browsers, fixtures)
* **Reusable shared helpers & selectors**
* **Playwright HTML Reports** (visual, interactive)
* **Nightly CI automation** using GitHub Actions
* **Environment variables via `.env` or GitHub Secrets**

---

##  Repository Structure

```
qa-tests/
│
├── package.json
├── playwright.config.ts
├── README.md
│
├── .github/
│   └── workflows/
│       ├── staking-ui.yml
│       ├── validator-ui.yml
│
├── projects/
│   ├── staking-ui/
│   │   ├── tests/
│   │   ├── fixtures/
│   │   └── config.ts
│   │
│   │
│   └── validator-ui/
│       ├── tests/
│       ├── fixtures/
│       └── config.ts
│
└── shared/
    ├── helpers/
    ├── selectors/
    └── utils/
```

---

## Setup & Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install --with-deps
```

---

## Environment Variables

Playwright reads environment variables from either:

### **A `.env` file** (for local development)

Create `.env` in the project root:

```
STAKING_URL=https://staking.polygon.technology/
```
> ⚠️ No quotes — keep variables clean (`KEY=value` only)

OR

### **GitHub Secrets** (for CI)

Set the following in:
**Settings → Secrets and variables → Actions**

* `VALIDATOR_URL`
* `STAKING_URL`

These are automatically passed to Playwright in CI jobs.

---

## Running Tests

### Run **all** tests

```bash
npx playwright test
```

### Run a specific UI project

Staking UI:

```bash
npx playwright test --project=staking-ui-chromium
```

Validator UI:

```bash
npx playwright test --project=validator-ui-chromium
```

Wallet UI:

```bash
npx playwright test --project=wallet-ui-chromium
```

### Run a specific test file

```bash
npx playwright test projects/staking-ui/tests/example.spec.ts
```

---

## Reports

Playwright generates an interactive HTML report in:

```
playwright-report/
```

Open it locally:

```bash
npx playwright show-report
```

This gives you:

* Pass/fail summaries
* Clicking into each test
* Step-by-step logs
* Screenshots & traces
* Attachments & console logs

Perfect for debugging and test triage.

---

## Nightly GitHub Actions

Each UI project has a nightly workflow (example):

```yaml
- name: Run staking UI tests (all browsers)
  run: >
    npx playwright test
    --project=staking-ui-chromium
    --project=staking-ui-firefox
    --project=staking-ui-webkit
```

Artifacts uploaded:

* Full HTML test report
* Screenshots, traces, logs (if enabled)

To view a report:

1. Open the GitHub Actions run
2. Scroll to **Artifacts**
3. Download the report ZIP
4. Open `playwright-report/index.html`

---

## Folder Overview

### `projects/<ui>/tests/`

Actual test specs (`*.spec.ts`).

### `projects/<ui>/fixtures/`

Reusable Playwright fixtures (auth, test setup, shared state).

### `shared/`

Global utilities:

* Selectors
* Helpers
* Request utilities
* Assertion helpers

### `playwright.config.ts`

* Loads environment variables
* Defines multiple projects
* Applies browser/device config
* Enables HTML reporting

---

## Extending the Suite

To add a new UI test project:

1. Create a folder in `projects/<new-ui>/`
2. Add:

   * `tests/`
   * `fixtures/`
   * `config.ts`
3. Add Playwright "projects" in `playwright.config.ts`
4. Add a new GitHub workflow (optional)

---

## Support / Contribution

* PRs should include or update tests where necessary
* Use clear naming for tests and selectors
* Keep shared helpers reusable and framework-agnostic
* Run all tests locally before pushing

---
