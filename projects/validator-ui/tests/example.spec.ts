import { test, expect } from '@playwright/test';

// @ts-check 
test('has title', async ({ page }) => {
  await page.goto(`${process.env.VALIDATOR_URL}`);
});

// @ts-check 
test('get started link', async ({ page }) => {
  await page.goto(`${process.env.VALIDATOR_URL}`);

  console.log(`${process.env.VALIDATOR_URL}`)
});


