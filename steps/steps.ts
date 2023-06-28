import { Given, Then, When } from '@cucumber/cucumber';
import { POManager } from '../pages/POManager';
import { expect } from '@playwright/test';

const playwright = require('@playwright/test');

Given(/^I open the browser$/, {timeout: 30_000}, async function () {
    const browser = await playwright.chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
});
Given(/^I am login to the application with "([^"]*)" and "([^"]*)"$/, {timeout: 30_000},
    async function (username: string, password: string) {
        await this.poManager.loginPage.load();
        await this.poManager.loginPage.login(username, password);
        this.email = username;
    });
When(/^I add "([^"]*)" to the cart$/, {timeout: 30_000}, async function (productName: string) {
    await this.poManager.dashboardPage.addProductToCart(productName);
    await this.poManager.dashboardPage.topBar.clickCartBtn();
});
Then(/^Verify "([^"]*)" is displayed in the cart page$/, {timeout: 30_000}, async function (productName: string) {
    const cartItem = await this.poManager.cartPage.isProductVisible(productName);
    expect(cartItem).toBeTruthy();
    await this.poManager.cartPage.clickCheckoutBtn();
    this.product = productName;
});
When(/^I enter valid details in the Place the Order page$/, {timeout: 30_000}, async function () {
    await this.poManager.checkoutPage.waitForPlaceOrderBtn();
    expect(await this.poManager.checkoutPage.isCCFilled()).toBeTruthy();
    await this.poManager.checkoutPage.selectMonth(11);
    await this.poManager.checkoutPage.selectYear(26);
    await this.poManager.checkoutPage.applyCoupon('rahulshettyacademy');
    await this.poManager.checkoutPage.selectCountry('India');
    expect(await this.poManager.checkoutPage.getEmailFldValue()).toEqual(this.email);
    await this.poManager.checkoutPage.clickPlaceOrderBtn();
});
Then(/^Verify order is present in the Order History page$/, {timeout: 30_000}, async function () {
    const trimmedOrderId = await this.poManager.checkoutPage.getOrderId();
    await this.poManager.checkoutPage.clickCurrentOrderLink();
    await this.poManager.orderPage.waitForOrderTableToBeVisible();
    const rowId = await this.poManager.orderPage.findRowOrder(trimmedOrderId ?? '');
    console.log(`Order found at row ${rowId}`);

    await this.poManager.orderPage.clickViewBtn(rowId);
    expect(await this.poManager.orderPage.getOrderTitle()).toEqual(this.product);
});
