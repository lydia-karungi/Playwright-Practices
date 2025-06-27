# Test info

- Name: Login >> Client App login for Zara Coat 4
- Location: /Users/lydiakarungi/Documents/PlayWrightAutomation/tests/ClientAppPO.spec.js:8:5

# Error details

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

    at CartPage.VerifyProductIsDisplayed (/Users/lydiakarungi/Documents/PlayWrightAutomation/pageobjects/CartPage.js:18:29)
    at /Users/lydiakarungi/Documents/PlayWrightAutomation/tests/ClientAppPO.spec.js:20:22
```

# Page snapshot

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "QA Meetup with Rahul Shetty @Pune - Limited Seats! Book Now!":
    - /url: https://qasummit.org/
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
   1 | const {test, expect} = require('@playwright/test');
   2 | class CartPage
   3 | {
   4 | constructor(page)
   5 | {
   6 |     this.page = page;
   7 |     this.cartProducts = page.locator("div li").first();
   8 |     this.productsText = page.locator(".card-body b");
   9 |     this.cart =  page.locator("[routerlink*='cart']");
  10 |     this.orders = page.locator("button[routerlink*='myorders']");
  11 |     this.checkout = page.locator("text=Checkout");
  12 |
  13 | }
  14 |
  15 | async VerifyProductIsDisplayed(productName)
  16 | {
  17 |    
> 18 |     await this.cartProducts.waitFor();
     |                             ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  19 |     const bool =await this.getProductLocator(productName).isVisible();
  20 |     expect(bool).toBeTruthy();
  21 |
  22 | }
  23 |
  24 | async Checkout()
  25 | {
  26 |     await this.checkout.click();
  27 | }
  28 |
  29 |  getProductLocator(productName)
  30 | {
  31 |     return  this.page.locator("h3:has-text('"+productName+"')");
  32 | }
  33 |
  34 | }
  35 | module.exports = {CartPage};
```