import { Locator, Page } from '@playwright/test';

type ProductOrderPages = 'Company info' | 'Order review' | 'Checkout' | 'Thank You';

type WaitForPageOptions = {
  timeout?: number;
  state?: 'domcontentloaded' | 'load' | 'networkidle';
};

export async function waitForPageToLoad(
  page: Page,
  pageTitle: ProductOrderPages,
  options: WaitForPageOptions = {},
): Promise<void> {
  const { timeout = 15000, state = 'load' } = options;

  await Promise.all([
    page.waitForFunction((title: string) => document.title.includes(title), pageTitle, { timeout }),
    page.waitForLoadState(state, { timeout }),
  ]);
}

export async function isForFieldInErrorState(element: Locator, timeout: number = 5000): Promise<boolean> {
  try {
    await element.waitFor({ state: 'attached', timeout });
    const className = await element.getAttribute('class');
    // Check if element contains the error class identifier in its class attribute
    return className?.includes('editInput_error__HQa9f') ?? false;
  } catch {
    return false;
  }
}

// Checks if multiple form fields are in an error state
export async function areFormFieldsInErrorState(elements: Locator[]): Promise<boolean> {
  const results = await Promise.all(elements.map((element) => isForFieldInErrorState(element)));
  return results.every((result) => result === true);
}
