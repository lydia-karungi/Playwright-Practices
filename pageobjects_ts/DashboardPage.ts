import {expect, Page, Locator} from '@playwright/test';
export class DashboardPage
{
    readonly page: Page;
    readonly products: Locator;
    readonly productsText: Locator;
    readonly cart: Locator;
    readonly orders: Locator;

constructor(page: Page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName)
{
   
    const titles= await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for(let i =0; i < count; ++i)
    {
    if(await this.products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await this.products.nth(i).locator("button:has-text('Add To Cart')").click();
        await this.page.waitForTimeout(1000); // waits for 1 second, adjust as needed
     }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}
module.exports = {DashboardPage};