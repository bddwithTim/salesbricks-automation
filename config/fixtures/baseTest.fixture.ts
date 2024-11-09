import { CheckoutPage, CompanyInfoPage, OrderReviewPage } from '@pages';
import { test as baseTest, expect } from '@playwright/test';

export const test = baseTest.extend<{
  checkoutPage: CheckoutPage;
  orderReviewPage: OrderReviewPage;
  companyInfoPage: CompanyInfoPage;
}>({
  checkoutPage: async ({ page }, use) => await use(new CheckoutPage(page)),
  orderReviewPage: async ({ page }, use) => await use(new OrderReviewPage(page)),
  companyInfoPage: async ({ page }, use) => await use(new CompanyInfoPage(page)),
});
export { expect };
