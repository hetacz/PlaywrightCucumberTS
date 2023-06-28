import { expect, test as customtest } from '../utils/testbase';
import { POManager } from '../pages/POManager';

customtest(`@PO Client App Login PO`, async ({page, fixture1}) => {

    const poManager = new POManager(page);
    const loginPage = poManager.loginPage;
    const dashboardPage = poManager.dashboardPage;
    const cartPage = poManager.cartPage;
    const checkoutPage = poManager.checkoutPage;
    const orderPage = poManager.orderPage;

    await loginPage.load();
    await loginPage.login(fixture1.username, fixture1.password);
    await dashboardPage.addProductToCart(fixture1.productName);

    await dashboardPage.topBar.clickCartBtn();
    const cartItem = await cartPage.isProductVisible(fixture1.productName);
    expect(cartItem).toBeTruthy();
    await cartPage.clickCheckoutBtn();

    await checkoutPage.waitForPlaceOrderBtn();
    expect(await checkoutPage.isCCFilled()).toBeTruthy();
    await checkoutPage.selectMonth(11);
    await checkoutPage.selectYear(26);
    await checkoutPage.applyCoupon('rahulshettyacademy');
    await checkoutPage.selectCountry('India');
    expect(await checkoutPage.getEmailFldValue()).toEqual(fixture1.username);
    await checkoutPage.clickPlaceOrderBtn();

    const trimmedOrderId = await checkoutPage.getOrderId();
    await checkoutPage.clickCurrentOrderLink();
    await orderPage.waitForOrderTableToBeVisible();
    const rowId = await orderPage.findRowOrder(trimmedOrderId);
    console.log(`Order found at row ${rowId}`);

    await orderPage.clickViewBtn(rowId);
    expect(await orderPage.getOrderTitle()).toEqual(fixture1.productName);
});
