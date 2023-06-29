import { expect, test } from '@playwright/test';

test('First playwright test - browser context', async ({browser}) => {

    // if no params better to use page as argument and skip these two lines
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
});

test('Second playwright test - page', async ({page}) => {

    await page.goto('https://google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('Third playwright test - error login.', async ({page}) => {

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await username.type('WRONG');
    await password.type('WRONG');
    await signInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    expect(await page.locator('[style*="block"]').textContent()).toContain('Incorrect');

    await username.fill('');
    await username.type('rahulshettyacademy');
    await password.fill('');
    await password.type('learning');
    // await Promise.all([
    //     page.waitForNavigation(),
    //     signInBtn.click()
    // ]);
    await signInBtn.click();
    console.log(await page.locator('.card-body a').nth(0).textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
});

test('Stop calls', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route(('**/*.css'), route => route.abort());
    // page.route(('**/*.{png, jpg, jpeg}'), route => route.abort());
    page.on('request', (request) => console.log(request.url()));
    page.on('response', (response) => console.log(response.status() + '\n' + response.url()));

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await username.type('WRONG');
    await password.type('WRONG');
    await signInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    expect(await page.locator('[style*="block"]').textContent()).toContain('Incorrect');

    await username.fill('');
    await username.type('rahulshettyacademy');
    await password.fill('');
    await password.type('learning');

    await signInBtn.click();
    console.log(await page.locator('.card-body a').nth(0).textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
});

test('Locator locator', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anishka@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
});

test('UI Controls', async ({page}) => {

    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveClass('blinkingText');
});

test('Handling child windows', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([ // const [newPage1, newPage2] = await Promise.all([ // for multiple pages
        context.waitForEvent('page'),
        documentLink.click()
    ]);
    const text = await newPage.locator('.red').textContent();
    await expect(text === null).toBeFalsy();
    const domain = text?.split('@')[1]?.split(' ')[0];
    console.log(domain);
    await userName.type(domain ?? '');
    console.log(await userName.textContent());
});
