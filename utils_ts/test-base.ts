import { test as baseTest } from '@playwright/test';

type testDataForOrder = {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder: testDataForOrder}>({
    testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "IPHONE 13 PRO"
    }
})