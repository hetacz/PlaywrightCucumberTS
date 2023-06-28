import { Given, Then, When } from '@cucumber/cucumber';
import { POManager } from '../../pages/POManager';
import { expect } from '@playwright/test';

const playwright = require('@playwright/test');

let username: string;
let product: string;

Given('I am login to the application with {email} and {password}', async function (email, password) {
    // if not using poManager
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    await poManager.loginPage.load();
    await poManager.loginPage.login(email, password);
    username = email;
    return 'pending';
});


When('I add {item} to the cart', async function (item) {
    await poManager.dashboardPage.addProductToCart(item);
    await poManager.dashboardPage.topBar.clickCartBtn();
});


Then('Verify {item} is displayed in the cart page.', async function (item) {
    const cartItem = await poManager.cartPage.isProductVisible(item);
    expect(cartItem).toBeTruthy();
    await poManager.cartPage.clickCheckoutBtn();
    product = item;
});


When('I enter valid details in the Place the Order page', async function () {
    await poManager.checkoutPage.waitForPlaceOrderBtn();
    expect(await poManager.checkoutPage.isCCFilled()).toBeTruthy();
    await poManager.checkoutPage.selectMonth(11);
    await poManager.checkoutPage.selectYear(26);
    await poManager.checkoutPage.applyCoupon('rahulshettyacademy');
    await poManager.checkoutPage.selectCountry('India');
    expect(await poManager.checkoutPage.getEmailFldValue()).toEqual(username);
    await poManager.checkoutPage.clickPlaceOrderBtn();
});


Then('Verify order is present in the Order History page', async function () {
    await poManager.checkoutPage.clickPlaceOrderBtn();

    const trimmedOrderId = await poManager.checkoutPage.getOrderId();
    await poManager.checkoutPage.clickCurrentOrderLink();
    await poManager.orderPage.waitForOrderTableToBeVisible();
    const rowId = await poManager.orderPage.findRowOrder(trimmedOrderId);
    console.log(`Order found at row ${rowId}`);

    await poManager.orderPage.clickViewBtn(rowId);
    expect(await poManager.orderPage.getOrderTitle()).toEqual(product);
});
