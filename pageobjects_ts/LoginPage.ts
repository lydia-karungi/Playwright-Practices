import { expect, Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signInbutton: Locator;
    readonly userName: Locator;
    readonly password: Locator;

constructor(page: Page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
module.exports = {LoginPage};