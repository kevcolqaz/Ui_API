import { defineConfig, devices } from '@playwright/test';
import phoneTestData from './tests/test-data/phones.json';
import apiTestData from './tests/test-data/api-users.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: phoneTestData.flipkart.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: '**/ecommerce-phones.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: '**/ecommerce-phones.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'api',
      testMatch: '**/*.api.spec.ts',
      use: {
        baseURL: apiTestData.reqres.baseUrl,
      },
    },
  ],
});
