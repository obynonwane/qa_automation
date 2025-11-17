# QA End-to-End Test Suite

This repository contains the end-to-end (E2E) automation suite for Polygon’s web applications, built using **Playwright**.
The suite supports **multiple UI projects**, **environment-based URLs**, and **nightly CI runs**.

---

## Features

* Modern Playwright E2E setup
* Multi-project structure (`staking-ui`, `validator-ui`, etc.)
* Reusable fixtures, helpers, selectors
* CI-ready (GitHub Actions)
* Visual HTML reports with traces & screenshots
* Tag-based test execution (`@smoke`, `@regression`, `@critical`)

---

## Repository Structure

```
qa-automation/
│
├── package.json
├── playwright.config.ts
├── README.md
│
├── .github/
│   └── workflows/
│       ├── staking-ui.yml
│       └── validator-ui.yml
│
├── projects/
│   ├── staking-ui/
│   │   ├── tests/
│   │   │   └── staking.spec.ts
│   │   ├── fixtures/
│   │   └── config.ts
│   │
│   ├── validator-ui/
│       ├── tests/
│       │   └── validator.spec.ts
│       ├── fixtures/
│       └── config.ts
│
└── shared/
    ├── helpers/
    ├── selectors/
    └── utils/
```

---

## Installation

```bash
npm install
npx playwright install --with-deps
```

---

## Environment Variables

Local `.env`:

```
VALIDATOR_URL=https://validator-staging.polygon.technology/
STAKING_URL=https://staking-staging.polygon.technology/
```

GitHub CI uses repository secrets with the same variable names.

---

# Running Tests

## Run all tests

```bash
npx playwright test
```

## Run headed (visible browser)

```bash
npx playwright test --headed
```

## Run only one project (e.g., staking UI – Chromium)

```bash
npx playwright test --project=staking-ui-chromium
```

## Run one specific test file

```bash
npx playwright test projects/staking-ui/tests/staking.spec.ts
```

---

# Running Tests Using Tags (`@smoke`, `@regression`, `@critical`)

Tags are added inside **test titles**:

```ts
test('@smoke staking page loads', async ({ page }) => { ... });

test('@regression validator detail opens', async ({ page }) => { ... });

test('@critical APR label is visible', async ({ page }) => { ... });
```

### Run Smoke Tests Only

```bash
npx playwright test --grep "@smoke"
```

### Run Regression Tests Only

```bash
npx playwright test --grep "@regression"
```

### Run Critical Tests Only

```bash
npx playwright test --grep "@critical"
```

### Run Smoke Tests in a Specific Project

```bash
npx playwright test \
  --project=staking-ui-chromium \
  --grep "@smoke"
```

### Run Everything *Except* Regression

```bash
npx playwright test --grep-invert "@regression"
```

---

# 📊 Reports

### View HTML Report Locally

```bash
npx playwright show-report
```

### View Trace

```bash
npx playwright show-trace trace.zip
```

CI uploads all artifacts from `playwright-report/`, including:

* HTML report
* Screenshots
* Videos
* Trace files

---