// import { binding, given, then, when } from 'cucumber-tsflow';
// import { POManager } from '../pages/POManager';
// import { expect, Page } from '@playwright/test';
//
// const playwright = require('@playwright/test');
//
// @binding()
// export class Steps {
//
//     private readonly poManager: POManager;
//     private email = '';
//     private product = '';
//
//     constructor(private readonly page: Page) {
//
//         this.poManager = new POManager(page);
//     }
//
//     @given('I am login to the application with {username} and {password}')
//     public async given_IamLoginToTheApplicationWithUsernameAndPassword(username: string, password: string) {
//
//         // IF NOT USING CTOR
//
//         // const browser = await playwright.chromium.launch();
//         // const context = await browser.newContext();
//         // const page = await context.newPage();
//         // const poManager = new POManager(page);
//         // await poManager.loginPage.load();
//         // await poManager.loginPage.login(username, password);
//
//         await this.poManager.loginPage.load();
//         await this.poManager.loginPage.login(username, password);
//         this.email = username;
//     }
//
//     @when('I add {productName} to the cart')
//     public async when_IAddProductToTheCart(productName: string) {
//         await this.poManager.dashboardPage.addProductToCart(productName);
//         await this.poManager.dashboardPage.topBar.clickCartBtn();
//     }
//
//
//     @then('Verify {productName} is displayed in the cart page')
//     public async then_VerifyProductIsDisplayedInTheCartPage(productName: string) {
//         const cartItem = await this.poManager.cartPage.isProductVisible(productName);
//         expect(cartItem).toBeTruthy();
//         await this.poManager.cartPage.clickCheckoutBtn();
//         this.product = productName;
//     }
//
//     @when('I enter valid details in the Place the Order page')
//     public async when_IEnterValidDetailsInThePlaceTheOrderPage() {
//         await this.poManager.checkoutPage.waitForPlaceOrderBtn();
//         expect(await this.poManager.checkoutPage.isCCFilled()).toBeTruthy();
//         await this.poManager.checkoutPage.selectMonth(11);
//         await this.poManager.checkoutPage.selectYear(26);
//         await this.poManager.checkoutPage.applyCoupon('rahulshettyacademy');
//         await this.poManager.checkoutPage.selectCountry('India');
//         expect(await this.poManager.checkoutPage.getEmailFldValue()).toEqual(this.email);
//         await this.poManager.checkoutPage.clickPlaceOrderBtn();
//     }
//
//
//     @then('Verify order is present in the Order History page')
//     public async then_VerifyOrderIsPresentInTheOrderHistoryPage() {
//         await this.poManager.checkoutPage.clickPlaceOrderBtn();
//
//         const trimmedOrderId = await this.poManager.checkoutPage.getOrderId();
//         await this.poManager.checkoutPage.clickCurrentOrderLink();
//         await this.poManager.orderPage.waitForOrderTableToBeVisible();
//         const rowId = await this.poManager.orderPage.findRowOrder(trimmedOrderId);
//         console.log(`Order found at row ${rowId}`);
//
//         await this.poManager.orderPage.clickViewBtn(rowId);
//         expect(await this.poManager.orderPage.getOrderTitle()).toEqual(this.product);
//     }
//
// }
