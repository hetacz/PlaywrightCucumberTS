import { expect, request, test } from '@playwright/test';
import { ApiUtils } from '../utils/apiUtils';

let token: string;
let orderResponseId: string;

const productName = 'zara coat 3';
const productId = '6262e95ae26b7e1a10e89bf0';

const loginPayload = {
    userEmail: 'qwe123@pl.pl',
    userPassword: 'Qqq111!!!'
};

const orderPayload = {
    orders: [{
        country: 'Cuba',
        productOrderedId: productId
    }]
};

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    token = await apiUtils.getToken();
    orderResponseId = await apiUtils.createOrder(orderPayload);
});

test('@Api Create Order', async ({page}) => {

    await page.addInitScript(async (value) => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('[routerlink*="myorders"]').click();
    await page.waitForLoadState('domcontentloaded');
    const orderRow
        = page.locator('table th[scope="row"]');
    await orderRow.first().waitFor();
    console.log(await orderRow.allTextContents());
    const rowId = (await orderRow.allTextContents()).findIndex((el) => el === orderResponseId);
    console.log(`Order found at row ${rowId}`);

    await page.locator('table td button.btn-primary').nth(rowId).click();
    await page.waitForLoadState('domcontentloaded');
    expect((await page.locator('div.title').textContent()).trim()).toEqual(productName);
});
