import { LoginPage } from './Login.page';
import { DashboardPage } from './Dashboard.page';
import { CartPage } from './Cart.page';
import { CheckoutPage } from './Checkout.page';
import { OrderPage } from './Order.page';
import { Page } from '@playwright/test';

export class POManager {

    private readonly _loginPage: LoginPage;
    private readonly _dashboardPage: DashboardPage;
    private readonly _cartPage: CartPage;
    private readonly _checkoutPage: CheckoutPage;
    private readonly _orderPage: OrderPage;

    constructor(private readonly page: Page) {
        this._loginPage = new LoginPage(page);
        this._dashboardPage = new DashboardPage(page);
        this._cartPage = new CartPage(page);
        this._checkoutPage = new CheckoutPage(page);
        this._orderPage = new OrderPage(page);
    }

    get loginPage(): LoginPage {
        return this._loginPage;
    }

    get dashboardPage(): DashboardPage {
        return this._dashboardPage;
    }

    get cartPage(): CartPage {
        return this._cartPage;
    }

    get checkoutPage(): CheckoutPage {
        return this._checkoutPage;
    }

    get orderPage(): OrderPage {
        return this._orderPage;
    }
}
