import { Locator, Page } from '@playwright/test';
import { TopBar } from './TopBar.page';

export class DashboardPage {
    private readonly cart: Locator;
    private readonly productText: Locator;
    private readonly products: Locator;
    private readonly _topBar: TopBar;

    constructor(private readonly page: Page) {
        this.products = page.locator('.card-body');
        this.productText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
        this._topBar = new TopBar(page);
    }

    get topBar(): TopBar {
        return this._topBar;
    }

    async addProductToCart(productName: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const title = await this.productText.allTextContents();
        console.log(title);
        const itemIndex = title.findIndex((el) => el === productName);
        console.log(itemIndex);
        await this.products.nth(itemIndex).locator('text="Add To Cart"').click();
    }
}
