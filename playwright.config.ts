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
    reporter: 'html',
    use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure',
    },
});
