import { test, expect } from '@playwright/test';
import { customTest } from '../utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';

const dataset = JSON.parse(JSON.stringify(require('../utils_ts/placeorderTestData.json'))); //Json -> String =>js object

for (const data of dataset) {
  test.describe(
    "Login",
    { tag: '@smoke' },
     () => {
      test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        //js file- Login js, DashboardPage
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        let orderId: any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


      });
    })


}

customTest(`Client App login with fixture data`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();



});
