import { expect, request, test } from '@playwright/test';
import { ApiUtils } from '../utils/apiUtils';

let token: string;
let orderResponseId: string;

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

test('Empty cart', async ({page}) => {

    await page.addInitScript(async (value) => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');

    await page.route('**/get-orders-for-customer/**', async (route) => {
        const response = await page.request.fetch(route.request());
        const payload = {
            'data': [],
            'message': 'No orders'
        };
        await route.fulfill({
            response: response,
            body: JSON.stringify(payload),
        });
    });

    await page.locator('[routerlink*="myorders"]').click();
    await page.waitForLoadState('networkidle');
    const noOrdersDiv = page.locator('div.mt-4.ng-star-inserted');
    await expect(noOrdersDiv).toHaveText('Loading....');
    await expect(noOrdersDiv).toContainText('No Orders');
});
