import { expect, test } from '@fixtures/baseTest.fixture';
import { navigateToOrderReviewPage } from '@pages/orderReview.page';
import { waitForPageToLoad } from '@utils/pageHelpers';

test(
  'Validate Navigation Through Checkout Flow',
  { tag: ['@smoke'] },
  async ({ page, orderReviewPage, companyInfoPage, checkoutPage }) => {
    // Navigate to the landing page - Order Review Page
    await navigateToOrderReviewPage(page);

    // Select the SMB Plan Option with the Additional Platform User Add-On
    await orderReviewPage.locator.SMBPlanOption.click();
    await orderReviewPage.locator.SMBPlanAddOns.additionalPlatformUser.click();

    await orderReviewPage.locator.continueButton.click();

    // wait for it to navigate to the Company Info Page
    await waitForPageToLoad(page, 'Company info', { timeout: 15000 });

    // Fill out the Company Info Form
    await companyInfoPage.fillCompanyAddressFields({
      companyLegalName: 'Test Company',
      streetAddress: '123 Main St',
      city: 'Anytown',
      zip: '12345',
    });

    await companyInfoPage.fillPointOfContactFields({
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'CEO',
      workEmail: 'john.doe@example.com',
    });

    await companyInfoPage.locator.continueButton.click();

    // wait for it to navigate to the Checkout Page
    await waitForPageToLoad(page, 'Checkout', {
      timeout: 30000,
      state: 'networkidle',
    }); // need to set to `networkidle` to allow the card details to load

    await checkoutPage.locator.orderCompletionOptions.electronically.click();
    await checkoutPage.locator.paymentMethod.card.click();

    await checkoutPage.inputCardDetails({
      cardNumber: '4242424242424242',
      expirationDate: '1230',
      securityCode: '123',
      country: 'United States',
      zipCode: '12345',
    });

    // Accounts Payable Information
    await checkoutPage.locator.emailInput.fill('john.doe@example.com');

    await checkoutPage.clickTermsCheckbox({ state: 'checked' });
    await checkoutPage.locator.placeOrderButton.click();
    await checkoutPage.waitForProcessingYourPaymentModal();

    // wait for Thank you page to load
    await waitForPageToLoad(page, 'Thank You', {
      timeout: 30000,
      state: 'load',
    });
  },
);

test('Validate Cost Calculation', { tag: ['@smoke'] }, async ({ page, orderReviewPage }) => {
  // Navigate to the landing page - Order Review Page
  await navigateToOrderReviewPage(page);

  // Select the SMB Plan Option with the Additional Platform User Add-On
  await orderReviewPage.locator.enterprisePlanOption.click();
  await orderReviewPage.locator.enterprisePlanAddOns.additionalPlatformUser.click();

  // validate cost
  const totalCost = await orderReviewPage.getTotalCost();
  expect(totalCost).toEqual('$36,588.00');
});
