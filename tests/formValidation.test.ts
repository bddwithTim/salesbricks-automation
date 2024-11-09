import { expect, test } from '@fixtures/baseTest.fixture';
import { navigateToOrderReviewPage } from '@pages/orderReview.page';
import { areFormFieldsInErrorState, waitForPageToLoad } from '@utils/pageHelpers';

test(
  'Validate Missing Information Error Message',
  { tag: ['@functional'] },
  async ({ page, orderReviewPage, companyInfoPage }) => {
    await navigateToOrderReviewPage(page);

    await orderReviewPage.locator.SMBPlanOption.click();
    await orderReviewPage.locator.SMBPlanAddOns.additionalPlatformUser.click();
    await orderReviewPage.locator.continueButton.click();

    await waitForPageToLoad(page, 'Company info', {
      timeout: 10000,
      state: 'load',
    });

    await companyInfoPage.fillCompanyAddressFields({
      companyLegalName: '', // Leave a Required Field Empty
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'Texas',
      zip: '12345',
      country: 'United States',
    });

    await companyInfoPage.fillPointOfContactFields({
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'CEO',
      workEmail: 'john.doe@example.com',
    });

    await companyInfoPage.locator.continueButton.click();

    // Validate Missing Information Error Message
    await expect(orderReviewPage.locator.missingInformationErrorMessage).toHaveText(
      '*Please provide the missing information so we can complete your order.',
    );
  },
);

test(
  'Validate Error Handling for Failed Payment - Invalid Card Number',
  { tag: ['@functional'] },
  async ({ page, orderReviewPage, companyInfoPage, checkoutPage }) => {
    await navigateToOrderReviewPage(page);

    await orderReviewPage.locator.SMBPlanOption.click();
    await orderReviewPage.locator.SMBPlanAddOns.additionalPlatformUser.click();
    await orderReviewPage.locator.continueButton.click();

    await waitForPageToLoad(page, 'Company info', {
      timeout: 10000,
      state: 'load',
    });

    await companyInfoPage.fillCompanyAddressFields({
      companyLegalName: 'Test Company',
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'Texas',
      zip: '12345',
      country: 'United States',
    });

    await companyInfoPage.fillPointOfContactFields({
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'CEO',
      workEmail: 'john.doe@example.com',
    });

    await companyInfoPage.locator.continueButton.click();

    await waitForPageToLoad(page, 'Checkout', {
      timeout: 10000,
      state: 'networkidle',
    }); // need to set to `networkidle` to allow the card details to load

    await checkoutPage.locator.orderCompletionOptions.electronically.click();
    await checkoutPage.locator.paymentMethod.card.click();

    await checkoutPage.locator.cardNumberInput.fill('2412 4112 4124 1512');
    await page.keyboard.press('Tab'); // press tab to move to the next field to trigger error state of the card number field

    // Validate Invalid Card Number Error Message
    await expect(checkoutPage.locator.invalidCardNumberErrorMessage).toHaveText('Your card number is invalid.');
  },
);

test(
  'Validate required fields display error state when left empty',
  { tag: ['@functional'] },
  async ({ page, orderReviewPage, companyInfoPage }) => {
    await navigateToOrderReviewPage(page);

    await orderReviewPage.locator.SMBPlanOption.click();
    await orderReviewPage.locator.SMBPlanAddOns.additionalPlatformUser.click();
    await orderReviewPage.locator.continueButton.click();

    await waitForPageToLoad(page, 'Company info', {
      timeout: 10000,
      state: 'load',
    });
    await companyInfoPage.locator.continueButton.click();

    // Assert that the required fields are on error state
    const requiredFields = [
      companyInfoPage.locator.companyLegalNameInput,
      companyInfoPage.locator.streetAddressInput,
      companyInfoPage.locator.cityInput,
      companyInfoPage.locator.zipInput,

      companyInfoPage.locator.firstNameInput,
      companyInfoPage.locator.lastNameInput,
      companyInfoPage.locator.workEmailInput,
    ];
    expect(await areFormFieldsInErrorState(requiredFields)).toBe(true);
  },
);
