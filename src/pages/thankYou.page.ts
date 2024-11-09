import { Page } from '@playwright/test';

export class ThankYouPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locator() {
    return {
      // Label
      orderCompleteLabel: this.page.locator('h1:has-text("Your order is complete")'),
    };
  }
}
