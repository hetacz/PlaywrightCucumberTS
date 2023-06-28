import { binding, given, then, when } from 'cucumber-tsflow';
import { POManager } from '../pages/POManager';
import { expect } from '@playwright/test';

const playwright = require('@playwright/test');

@binding()
export class Steps {

    private email = '';
    private product = '';
    private poManager;

    @given('I open the browser', {timeout: 30_000})
    public async given_IamOnTheLoginPage() {
        const browser = await playwright.chromium.launch({headless: true});
        const context = await browser.newContext();
        const page = await context.newPage();
        this.poManager = new POManager(page);
    }

    @given('I am login to the application with {string} and {string}', {timeout: 30_000})
    public async given_IamLoginToTheApplicationWithUsernameAndPassword(username: string, password: string) {

        // IF NOT USING CTOR
        // console.log('x');
        // const browser = await playwright.chromium.launch({headless: true, timeout: 30_000});
        // console.log('x');
        // const context = await browser.newContext();
        // console.log('x');
        // const page = await context.newPage();
        // console.log('x');
        // this.poManager = new POManager(page);

        await this.poManager.loginPage.load();
        await this.poManager.loginPage.login(username, password);
        this.email = username;
    }

    @when('I add {string} to the cart', {timeout: 30_000})
    public async when_IAddProductToTheCart(productName: string) {
        await this.poManager.dashboardPage.addProductToCart(productName);
        await this.poManager.dashboardPage.topBar.clickCartBtn();
    }


    @then('Verify {string} is displayed in the cart page', '', 30_000)
    public async then_VerifyProductIsDisplayedInTheCartPage(productName: string) {
        const cartItem = await this.poManager.cartPage.isProductVisible(productName);
        expect(cartItem).toBeTruthy();
        await this.poManager.cartPage.clickCheckoutBtn();
        this.product = productName;
    }

    @when('I enter valid details in the Place the Order page', {timeout: 30_000})
    public async when_IEnterValidDetailsInThePlaceTheOrderPage() {
        await this.poManager.checkoutPage.waitForPlaceOrderBtn();
        expect(await this.poManager.checkoutPage.isCCFilled()).toBeTruthy();
        await this.poManager.checkoutPage.selectMonth(11);
        await this.poManager.checkoutPage.selectYear(26);
        await this.poManager.checkoutPage.applyCoupon('rahulshettyacademy');
        await this.poManager.checkoutPage.selectCountry('India');
        expect(await this.poManager.checkoutPage.getEmailFldValue()).toEqual(this.email);
        await this.poManager.checkoutPage.clickPlaceOrderBtn();
    }


    @then('Verify order is present in the Order History page', '', 30_000)
    public async then_VerifyOrderIsPresentInTheOrderHistoryPage() {
        const trimmedOrderId = await this.poManager.checkoutPage.getOrderId();
        await this.poManager.checkoutPage.clickCurrentOrderLink();
        await this.poManager.orderPage.waitForOrderTableToBeVisible();
        const rowId = await this.poManager.orderPage.findRowOrder(trimmedOrderId ?? '');
        console.log(`Order found at row ${rowId}`);

        await this.poManager.orderPage.clickViewBtn(rowId);
        expect(await this.poManager.orderPage.getOrderTitle()).toEqual(this.product);
    }
}
