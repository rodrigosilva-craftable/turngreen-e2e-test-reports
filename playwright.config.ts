import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Se ENV está definido, tenta `.env.{ENV}`, senão usa `.env`
const envFile = process.env.ENV ? `.env.${process.env.ENV}` : '.env';
dotenv.config({ path: envFile });

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/examples_old/**'],
  timeout: 90 * 1000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      categories: [
        {
          name: 'Ignored tests',
          matchedStatuses: ['skipped']
        },
        {
          name: 'Product defects',
          matchedStatuses: ['failed']
        },
        {
          name: 'Test defects',
          matchedStatuses: ['broken']
        }
      ],
      environmentInfo: {
        framework: 'Playwright',
        node_version: process.version,
        credentials: 'MASKED FOR SECURITY'
      }
    }]
  ],
  use: {
    headless: process.env.CI ? true : false,
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: null,
    launchOptions: {
      args: [
        '--start-maximized',
        '--window-position=0,0',
        '--disable-blink-features=AutomationControlled'
      ]
    }
  },
  projects: [
    { 
      name: 'chromium', 
      use: {
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    }
  ]
});