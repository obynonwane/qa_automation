import { test, expect } from '@playwright/test';

// @ts-check 
test('@smoke has title', async ({ page }) => {
  await page.goto(`${process.env.VALIDATOR_URL}`);
});

// @ts-check 
test('@critical get started link', async ({ page }) => {
  await page.goto(`${process.env.VALIDATOR_URL}`);

  console.log(`${process.env.VALIDATOR_URL}`)
});


