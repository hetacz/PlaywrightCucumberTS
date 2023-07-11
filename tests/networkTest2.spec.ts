import {request, test} from '@playwright/test';
import {ApiUtils} from '../utils/apiUtils';

let token: string;
let orderResponseId: string;

const productId = '6262e9d9e26b7e1a10e89c04';

const loginPayload = { // this account has one order
    userEmail: 'qwe123@ok.ok', // ok not pl as usual
    userPassword: ''
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

test('Try to open foreign order', async ({page}) => {

    await page.addInitScript(async (value) => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');

    await page.pause();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64948d967244490f956a3d23',
        (route) => {
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64976d807244490f956c1141'
            });
        });
    // await
    // page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64976d807244490f956c1141',
    // async (route) => { await route.continue({ url:
    // 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64948d967244490f956a3d23' }); });
    await page.locator('[routerlink*="myorders"]').click();

    await page.pause();

    const viewBtn = page.locator('button:has-text("View")');
    await viewBtn.first().click();
    await page.pause();
});
