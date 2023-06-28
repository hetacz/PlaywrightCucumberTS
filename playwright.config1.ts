import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

    testDir: './tests',
    timeout: 45 * 1000,
    expect: {
        timeout: 5 * 1000,
    },
    retries: process.env.CI ? 2 : 0,
    workers: 2,
    projects: [{
        name: 'Firefox',
        use: {
            browserName: 'firefox',
            headless: true,
            video: 'retain-on-failure',
            screenshot: 'only-on-failure',
            trace: 'on-first-retry',
        },
    }, {
        name: 'Chrome',
        use: {
            browserName: 'chromium',
            headless: true,
            video: 'retain-on-failure',
            screenshot: 'only-on-failure',
            trace: 'on-first-retry',
        },
    }],
    reporter: 'html',
});
