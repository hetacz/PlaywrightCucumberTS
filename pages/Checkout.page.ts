import { Locator, Page } from '@playwright/test';
import { TopBar } from './TopBar.page';

export class CheckoutPage {

    private readonly _topBar: TopBar;
    private readonly countryDrop: Locator;
    private readonly couponBtn: Locator;
    private readonly couponP: Locator;
    private readonly dropdown: Locator;
    private readonly finishedOrderTable: Locator;
    private readonly inputFLd: Locator;
    private readonly placeOrderBtn: Locator;

    constructor(private readonly page: Page) {
        this.placeOrderBtn = this.page.locator('text="Place Order"');
        this.dropdown = this.page.locator('select.input.ddl');
        this.inputFLd = this.page.locator('input.input.txt');
        this.couponBtn = this.page.locator('button[type="submit"]');
        this.couponP = this.page.locator('p.ng-star-inserted');
        this.countryDrop = this.page.locator('section.ta-results');
        this.finishedOrderTable = this.page.locator('table label');
        this._topBar = new TopBar(page);
    }

    get topBar() {
        return this._topBar;
    }

    async applyCoupon(coupon: string) {
        await this.inputFLd.nth(3).fill(coupon);
        await this.couponBtn.click();
        await this.couponP.waitFor();
    }

    async clickCurrentOrderLink() {
        await (this.finishedOrderTable.first()).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickPlaceOrderBtn() {
        await this.placeOrderBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async fillCC(cc: number) {
        await this.inputFLd.nth(0).clear();
        await this.inputFLd.nth(0).fill(cc.toString());
    }

    async fillCCV(ccv: number) {
        await this.inputFLd.nth(1).fill(ccv.toString());
    }

    async fillName(name: string) {
        await this.inputFLd.nth(2).fill(name);
    }

    async getEmailFldValue() {
        return await this.inputFLd.nth(4).inputValue();
    }

    async getOrderId() {
        const orderId = await (this.finishedOrderTable.last()).textContent();
        const trimmedOrderId = orderId?.replaceAll('|', '').trim();
        console.log(trimmedOrderId);
        return trimmedOrderId ?? '';
    }

    async isCCFilled() {
        return await this.inputFLd.nth(0).inputValue() !== '';
    }

    async selectCountry(country: string) {
        await this.inputFLd.last().type(country, {delay: 100});
        await this.countryDrop.waitFor();
        await this.page.locator(`button.ta-item > span:text-is(" ${country}")`).click();
    }

    async selectMonth(month: number) {
        await this.dropdown.first().selectOption({index: month});
    }

    async selectYear(year: number) {
        await this.dropdown.last().selectOption({index: year});
    }

    async waitForPlaceOrderBtn() {
        await this.placeOrderBtn.waitFor();
    }
}
