import { expect, test } from '@playwright/test';
import { POManager } from '../pages/POManager';
import testData from '../utils/testData.json';

for (const data of testData) {

    test(`@PO Client App Login PO ${data.productName}`, async ({page}) => {

        const poManager = new POManager(page);
        const loginPage = poManager.loginPage;
        const dashboardPage = poManager.dashboardPage;
        const cartPage = poManager.cartPage;
        const checkoutPage = poManager.checkoutPage;
        const orderPage = poManager.orderPage;

        await loginPage.load();
        await loginPage.login(data.username, data.password);
        await dashboardPage.addProductToCart(data.productName);

        await dashboardPage.topBar.clickCartBtn();
        const cartItem = await cartPage.isProductVisible(data.productName);
        expect(cartItem).toBeTruthy();
        await cartPage.clickCheckoutBtn();

        await checkoutPage.waitForPlaceOrderBtn();
        expect(await checkoutPage.isCCFilled()).toBeTruthy();
        await checkoutPage.selectMonth(11);
        await checkoutPage.selectYear(26);
        await checkoutPage.applyCoupon('rahulshettyacademy');
        await checkoutPage.selectCountry('India');
        expect(await checkoutPage.getEmailFldValue()).toEqual(data.username);
        await checkoutPage.clickPlaceOrderBtn();

        const trimmedOrderId = await checkoutPage.getOrderId();
        await checkoutPage.clickCurrentOrderLink();
        await orderPage.waitForOrderTableToBeVisible();
        const rowId = await orderPage.findRowOrder(trimmedOrderId);
        console.log(`Order found at row ${rowId}`);

        await orderPage.clickViewBtn(rowId);
        expect(await orderPage.getOrderTitle()).toEqual(data.productName);
    });
}
