import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given(
    /^I am login to the application2 with "([^"]*)" and "([^"]*)"$/,
    async function (username: string, password: string) {
        const usernameFld = this.page.locator('#username');
        const passwordFld = this.page.locator('#password');
        const signInBtn = this.page.locator('#signInBtn');

        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await usernameFld.type(username);
        await passwordFld.type(password);
        await signInBtn.click();
    }
);
Then(/^I should see the error message containing "([^"]*)"$/, async function (message: string) {
    console.log(await this.page.locator('[style*="block"]').textContent());
    expect(await this.page.locator('[style*="block"]').textContent()).toContain(message);
});
