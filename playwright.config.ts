import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { testConfig } from './testConfig';

const environmentName = process.env.ENV ?? 'prod';
const allowedEnvironments = ['prod', 'staging', 'api', 'devApi'] as const;

if (!allowedEnvironments.includes(environmentName as (typeof allowedEnvironments)[number])) {
  // eslint-disable-next-line no-console
  console.error(
    `Invalid ENV="${environmentName}". Use one of: ${allowedEnvironments.join(
      ', '
    )}. Example: npx cross-env ENV=staging playwright test`
  );
  process.exit(1);
}

const commonUseOptions = {
  baseURL: testConfig[environmentName as keyof typeof testConfig],
  ignoreHTTPSErrors: true,
  acceptDownloads: true,

  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',

  launchOptions: {
    slowMo: 0,
  },
} as const;

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  testIgnore: ['./src/components/**'],

  globalSetup: './global-setup',

  timeout: 20_000,
  retries: 0,

  reporter: [
    ['./CustomReporterConfig.ts'],
    ['allure-playwright'],
    ['html', { outputFolder: 'html-report', open: 'never' }],
  ],

  projects: [
    {
      name: 'Chrome',
      use: {
        ...commonUseOptions,
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: { width: 1908, height: 771 },

        // If you prefer video/trace always on Chrome:
        video: 'on',
        trace: 'on',
      },
    },
    {
      name: 'Chromium',
      use: {
        ...commonUseOptions,
        browserName: 'chromium',
        headless: true,
        viewport: { width: 1908, height: 471 },
        launchOptions: {
          ...commonUseOptions.launchOptions,
          args: ['--force-headless-for-tests'],
        },
      },
    },
    {
      name: 'Firefox',
      use: {
        ...commonUseOptions,
        browserName: 'firefox',
        headless: true,
        viewport: { width: 1500, height: 730 },
      },
    },
    {
      name: 'Edge',
      use: {
        ...commonUseOptions,
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: { width: 1500, height: 730 },
      },
    },
    {
      name: 'WebKit',
      use: {
        ...commonUseOptions,
        browserName: 'webkit',
        headless: true,
        viewport: { width: 1500, height: 730 },
      },
    },
    {
      name: 'Device',
      use: {
        ...commonUseOptions,
        ...devices['Pixel 4a (5G)'],
        browserName: 'chromium',
        channel: 'chrome',
        headless: true,
      },
    },

    // Placeholder projects kept as-is (no runner settings provided in your snippet)
    { name: 'DB' },
    {
      name: 'API',
      use: {
        baseURL: testConfig[environmentName as keyof typeof testConfig],
      },
    },
  ],
};

export default config;
