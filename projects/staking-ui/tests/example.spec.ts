import { test, expect } from '@playwright/test';

// @ts-check 
test('test', async ({ page }) => {
  await page.goto(`${process.env.STAKING_URL}`);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Connect wallet' }).click();
  await page.getByRole('button', { name: 'MetaMask MetaMask' }).click();
  await page.locator('.wui-font-paragraph-500.wui-color-fg-200').click();
  await page.locator('wui-icon-link:nth-child(3) > button').click();
  await page.getByRole('link', { name: 'Stake Calculator' }).click();
  await page.getByRole('link', { name: 'Overview' }).click();

});