import { Locator, Page } from '@playwright/test';
import { TopBar } from './TopBar.page';

export class LoginPage {

    private readonly emailFld: Locator;
    private readonly loginBtn: Locator;
    private readonly passwordFld: Locator;
    private readonly _topBar: TopBar;

    constructor(private readonly page: Page) {
        this.emailFld = page.locator('#userEmail');
        this.passwordFld = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
        this._topBar = new TopBar(page);
    }

    get topBar(): TopBar {
        return this._topBar;
    }

    async load() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(email: string, password: string) {
        await this.emailFld.type(email);
        await this.passwordFld.type(password);
        await Promise.all([
            this.loginBtn.click(),
            this.page.waitForLoadState('networkidle'),
            this.page.waitForResponse(
                (response) => ['jpeg', 'jpg', 'png'].some((el) => response.url().includes(el)) && response.ok())
        ]);
    }
}
