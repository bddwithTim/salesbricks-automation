import { Page } from '@playwright/test';

export class OrderReviewPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locator() {
    return {
      // Commitment Section
      // dropdown with 2 choices: monthly or annual

      // Plans Section
      freePlanOption: this.page.locator('div[data-test-id="Free Plan"] h3', {
        hasText: 'Free Plan',
      }),
      SMBPlanOption: this.page.locator('div[data-test-id="SMB Plan"] h3', {
        hasText: 'SMB Plan',
      }),
      enterprisePlanOption: this.page.locator('div[data-test-id="Enterprise Plan"] h3', { hasText: 'Enterprise Plan' }),

      freePlanAddOns: {
        complimentaryConsultingSession: this.page.locator(
          'div[data-test-id="Complimentary Consulting Session (Up to 3 Hours)"]',
        ),
      },

      SMBPlanAddOns: {
        additionalPlatformUser: this.page.locator('div[data-test-id="Additional Platform User"]'),
        platformUsageBrick: this.page.locator('div[data-test-id="Platform Usage Brick"]'),
      },

      enterprisePlanAddOns: {
        additionalAnnualTotalContractValue: this.page.locator(
          'p:has-text("Additional $500,000 (ATV) Annual Total Contract Value")',
        ),
        additionalPlatformUser: this.page.locator('p:has-text("Additional Platform User")'),
      },

      // Buttons
      continueButton: this.page.locator('span:has-text("Continue")'),

      // labels
      totalCost: this.page.locator('p[data-test="components-buildOrder-costTable-summary-total"]').textContent(),
      missingInformationErrorMessage: this.page.locator('p[class="companyDetails_formErrorMessage__rYbLb"]'),
    };
  }

  async getTotalCost() {
    await this.page.waitForLoadState('networkidle'); // needs to be set to `networkidle` to ensure price calculations are complete
    const totalCost = await this.locator.totalCost;
    return totalCost;
  }
}

export async function navigateToOrderReviewPage(page: Page): Promise<void> {
  await page.goto('');
}
