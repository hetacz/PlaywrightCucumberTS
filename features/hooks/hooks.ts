import { POManager } from '../../pages/POManager';
import { AfterStep, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';

const playwright = require('@playwright/test');

setDefaultTimeout(30_000);

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: `screenshots/${Date.now()}.png`});
    }
});
