import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : 1,
  use: {
    headless: process.env.CI ? true : false,
    baseURL: 'https://app.staging.salesbricks.com/products/platform/new?sku=d4fedad5-4c48-5a6d-b6e6-0381a6490757',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  reporter: [['list'], ['html', { open: 'never', outputFolder: './reports/playwright-report' }]],
});
