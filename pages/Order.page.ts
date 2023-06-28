import { TopBar } from './TopBar.page';
import { Locator, Page } from '@playwright/test';

export class OrderPage {

    private readonly _topBar: TopBar;
    private readonly orderRow: Locator;
    private readonly orderViewBtn: Locator;
    private readonly divTitle: Locator;

    constructor(private readonly page: Page) {
        this._topBar = new TopBar(page);
        this.orderRow = page.locator('table th[scope="row"]');
        this.orderViewBtn = page.locator('table td button.btn-primary');
        this.divTitle = page.locator('div.title');
    }

    get topBar() {
        return this._topBar;
    }

    async waitForOrderTableToBeVisible() {
        return await this.orderRow.first().waitFor();
    }

    async findRowOrder(trimmedOrderId: string) {
        const orderId = await this.orderRow.allTextContents();
        console.log(orderId);
        return orderId.findIndex((el) => el.trim() === trimmedOrderId);
    }

    async clickViewBtn(index: number) {
        await (this.orderViewBtn.nth(index)).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getOrderTitle() {
        return (await this.divTitle.textContent())?.trim();
    }
}
