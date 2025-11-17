import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';


const envPath = path.join(__dirname, '.env');
/**
 * Read environment variables from file.
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    const value = rest.join('=').trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}


export default defineConfig({
  /* Shared test settings */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',  // Attach screenshots on failure
    video: 'retain-on-failure',     // Record video for failed tests
    headless: true,
    ignoreHTTPSErrors: true,
  },

  /* Base test directory containing all projects */
  testDir: './projects',

  /* Multi-project setup: each frontend app + multiple browsers */
  projects: [
    // Wallet UI
    {
      name: 'staking-ui-chromium',
      testDir: './projects/staking-ui/tests',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.STAKING_URL },
    },
    {
      name: 'staking-ui-firefox',
      testDir: './projects/staking-ui/tests',
      use: { ...devices['Desktop Firefox'], baseURL: process.env.STAKING_URL },
    },
    {
      name: 'staking-ui-webkit',
      testDir: './projects/staking-ui/tests',
      use: { ...devices['Desktop Safari'], baseURL: process.env.STAKING_URL },
    },

    // Dashboard UI
    {
      name: 'validator-ui-chromium',
      testDir: './projects/validator-ui/tests',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.VALIDATOR_URL },
    },
    {
      name: 'validator-ui-firefox',
      testDir: './projects/validator-ui/tests',
      use: { ...devices['Desktop Firefox'], baseURL: process.env.VALIDATOR_URL },
    },
    {
      name: 'validator-ui-webkit',
      testDir: './projects/validator-ui/tests',
      use: { ...devices['Desktop Safari'], baseURL: process.env.VALIDATOR_URL },
    },


  ],

  /* Optional: local dev server before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
