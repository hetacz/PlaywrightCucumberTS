import { expect, test } from '@playwright/test';

test.describe.configure({mode: 'parallel'}); // test in file run in parallel
// test.describe.configure({mode: 'serial'}); // test in file run in serial, if one fails all following fail too
// test.describe.configure({mode: 'default'}); // test in file run in serial.

test('Popup validation', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('http://google.com/');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });

    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href="lifetime-access"]:visible').click();
    // @ts-ignore
    const textCheck = (await framesPage.locator('.text h2').textContent()).replace('/[^0-9]/gm', '').trim();
    console.log(textCheck);
});

test('Screenshot and visual comparison', async ({page}) => {

    const element = page.locator('#displayed-text');
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(element).toBeVisible();
    await page.screenshot({path: 'partialScreenshot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(element).toBeHidden();
});

test('Visual', async ({page}) => {

    await page.goto('https://hetacz.com/');
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
});
