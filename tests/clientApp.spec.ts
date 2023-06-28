import { expect, test } from '@playwright/test';

test('Client App Login', async ({page}) => {

    const productName = 'zara coat 3';
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('qwe123@pl.pl');
    await page.locator('#userPassword').fill('Qqq111!!!');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    const title = await page.locator('.card-body b').allTextContents();
    console.log(title);
    const itemIndex = title.findIndex((el) => el === productName);
    console.log(itemIndex);
    await products.nth(itemIndex).locator('text="Add To Cart"').click();

    await page.locator('[routerlink*="cart"]').click();
    await page.waitForLoadState('networkidle');
    await page.locator('div li').first().waitFor(); // must waitFor single item
    const isVisible = await page.locator(`h3:has-text('${productName}')`).isVisible(); // no auto-wait for visibility
    expect(isVisible).toBeTruthy();
    await page.locator('text="Checkout"').click();
    const placeOrderBtn = page.locator('a.action__submit');
    await placeOrderBtn.waitFor();
    expect(await placeOrderBtn.isVisible()).toBeTruthy();
    const dropdown = page.locator('select.input.ddl');
    await dropdown.first().selectOption({label: '11'});
    await dropdown.last().selectOption({label: '26'});
    await page.locator('input.input.txt').nth(1).fill('111');
    await page.locator('input.input.txt').nth(2).fill('Rafał Michalski');
    await page.locator('input.input.txt').nth(3).fill('rahulshettyacademy');
    await page.locator('button[type="submit"]').click();
    await page.locator('p.ng-star-inserted').waitFor();
    await page.locator('input.input.txt').last().type('India', {delay: 100});
    await page.locator('section.ta-results').waitFor();
    await page.locator('button.ta-item > span:text-is(" India")').click();
    const email = await page.locator('input.input.txt').nth(4).inputValue();
    expect(email).toEqual('qwe123@pl.pl');
    await placeOrderBtn.click();

    await page.waitForLoadState('domcontentloaded');
    const orderId = await page.locator('table label').last().textContent();
    const trimmedOrderId = orderId.replaceAll('|', '').trim();
    console.log(trimmedOrderId);
    await page.locator('table label').first().click();
    await page.waitForLoadState('domcontentloaded');
    const orderRow = page.locator('table th[scope="row"]');
    await orderRow.first().waitFor();
    console.log(await orderRow.allTextContents());
    const rowId = (await orderRow.allTextContents()).findIndex((el) => el === trimmedOrderId);
    console.log(`Order found at row ${rowId}`);

    await page.locator('table td button.btn-primary').nth(rowId).click();
    await page.waitForLoadState('domcontentloaded');
    expect((await page.locator('div.title').textContent()).trim()).toEqual(productName);
});
