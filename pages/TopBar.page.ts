import { Locator, Page } from '@playwright/test';

export class TopBar {

    private readonly cartBtn: Locator;
    private readonly homeBtn: Locator;
    private readonly logo: Locator;
    private readonly logoutBtn: Locator;
    private readonly ordersBtn: Locator;

    constructor(private readonly page: Page) {
        this.logo = page.locator('h3:has-text("Automation")');
        this.homeBtn = page.locator('[routerlink*="dashboard"]');
        this.ordersBtn = page.locator('[routerlink*="myorders"]');
        this.cartBtn = page.locator('[routerlink*="cart"]');
        this.logoutBtn = page.locator('button:has-text(" Sign Out ")');
    }

    async clickCartBtn() {
        await this.cartBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('div li').first().waitFor();
    }

    async clickHomeBtn() {
        await this.homeBtn.click();
    }

    async clickLogo() {
        await this.logo.click();
    }

    async clickLogoutBtn() {
        await this.logoutBtn.click();
    }

    async clickOrdersBtn() {
        await this.ordersBtn.click();
    }
}
