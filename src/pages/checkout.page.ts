import { expect, FrameLocator, Page } from '@playwright/test';

type CardDetails = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  country: string;
  zipCode: string;
};

type CheckboxState = {
  state: 'checked' | 'unchecked';
};

export class CheckoutPage {
  private readonly page: Page;
  private readonly iFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.iFrame = this.page.frameLocator('iframe[title="Secure payment input frame"]');
  }

  get locator() {
    return {
      orderCompletionOptions: {
        electronically: this.page.locator('label[data-test="card-option-STRIPE"]'),
        orderForm: this.page.locator('label[data-test="card-option-ORDER_FORM"]'),
      },

      paymentMethod: {
        card: this.iFrame.locator('button[data-testid="card"]'),
        ach: this.iFrame.locator('button[id="us_bank_account-tab"]'),
      },

      // Card Information
      cardNumberInput: this.iFrame.locator('input[id="Field-numberInput"]'), // Field-numberInput
      expirationDateInput: this.iFrame.locator('input[id="Field-expiryInput"]'),
      securityCodeInput: this.iFrame.locator('input[id="Field-cvcInput"]'),
      countryDropdown: this.iFrame.locator('select[id="Field-countryInput"]'),
      zipCodeInput: this.iFrame.locator('input[id="Field-postalCodeInput"]'),

      // US Bank Account Information
      emailInput: this.page.locator('input[data-test="components-buildOrder-accountsPayable"]'),
      fullNameInput: this.page.locator('input[id="Field-nameInput"]'),
      bankSearchInput: this.page.locator('input[id="Field-bankInput"]'),

      // Accounts Payable Information
      accountsPayableEmailInput: this.page.locator('input[data-test="components-buildOrder-accountsPayable"]'),
      termsCheckbox: this.page.locator('input[type="checkbox"]'),

      // Buttons
      placeOrderButton: this.page.locator('button[title="Place order"]'),
      backButton: this.page.locator('button[title="Back"]'),

      // Modal
      processingYourPaymentModal: this.page.locator('//div[h1[text()="Processing your payment"]]'),

      // Labels
      invalidCardNumberErrorMessage: this.iFrame.locator('p#Field-numberError'),
    };
  }

  async clickTermsCheckbox({ state }: CheckboxState): Promise<void> {
    const shouldBeChecked = state === 'checked';
    const isChecked = await this.isTermsCheckboxChecked();

    if (isChecked !== shouldBeChecked) {
      await this.toggleTermsCheckbox(shouldBeChecked);
    }
  }

  private async isTermsCheckboxChecked(): Promise<boolean> {
    const currentState = await this.locator.termsCheckbox.getAttribute('data-checked');
    return currentState === 'true';
  }

  private async toggleTermsCheckbox(shouldBeChecked: boolean): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.locator.termsCheckbox.click();
      await this.page.waitForTimeout(500);
      const newState = await this.isTermsCheckboxChecked();
      if (newState === shouldBeChecked) {
        return;
      }
    }
    throw new Error(`Checkbox state did not change to ${shouldBeChecked ? 'checked' : 'unchecked'} as expected.`);
  }

  async clickPlaceOrderButton(): Promise<void> {
    await this.locator.placeOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.locator.placeOrderButton).toBeEnabled({ timeout: 5000 });
    await this.locator.placeOrderButton.click();
  }

  async inputCardDetails({ cardNumber, expirationDate, securityCode, country, zipCode }: CardDetails): Promise<void> {
    await this.locator.cardNumberInput.fill(cardNumber);
    await this.locator.expirationDateInput.fill(expirationDate);
    await this.locator.securityCodeInput.fill(securityCode);
    await this.locator.countryDropdown.selectOption(country);
    await this.locator.zipCodeInput.fill(zipCode);
  }

  async waitForProcessingYourPaymentModal(): Promise<void> {
    await this.locator.processingYourPaymentModal.waitFor({ timeout: 20000 });
    await this.locator.processingYourPaymentModal.waitFor({ state: 'hidden' });
  }
}
