import { Locator, Page } from '@playwright/test';
import { TopBar } from './TopBar.page';

export class CartPage {

    private readonly _topBar: TopBar;
    private readonly checkoutBtn: Locator;

    constructor(private readonly page: Page) {
        this._topBar = new TopBar(page);
        this.checkoutBtn = page.locator('text="Checkout"');
    }

    get topBar() {
        return this._topBar;
    }

    async isProductVisible(productName: string) {
        const productH3 = this.page.locator(`h3:has-text('${productName}')`);
        return await productH3.isVisible();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }
}
