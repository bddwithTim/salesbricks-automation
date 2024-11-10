import { Page } from '@playwright/test';

type CompanyAddressFields = {
  companyLegalName: string;
  streetAddress: string;
  suiteBuilding?: string;
  city: string;
  state?: string;
  zip: string;
  country?: string;
};

type PointOfContactFields = {
  firstName: string;
  lastName: string;
  preferredName?: string;
  jobTitle: string;
  workEmail: string;
};

export class CompanyInfoPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locator() {
    return {
      // Input Fields - Address
      companyLegalNameInput: this.page.locator('input[placeholder="Acme Co"]'),
      streetAddressInput: this.page.locator('input[placeholder="Street address"]'),
      suiteBuildingInput: this.page.locator('input[placeholder*="Suite, building"]'),
      cityInput: this.page.locator('input[placeholder="City"]'),
      zipInput: this.page.locator('input[placeholder="Zip"]'),

      // Input Fields - Point of Contact
      firstNameInput: this.page.locator('input[data-test="components-personInput-firstName"]'),
      lastNameInput: this.page.locator('input[data-test="components-personInput-lastName"]'),
      preferredNameInput: this.page.locator('input[data-test="components-personInput-preferredName"]'),
      jobTitleInput: this.page.locator('input[data-test="components-personInput-role"]'),
      workEmailInput: this.page.locator('input[data-test="components-personInput-email"]'),

      // Dropdown buttons
      stateDropdown: this.page.locator('button[data-test="components-addressInput-region"]'),
      countryDropdown: this.page.locator('button[data-test="components-addressInput-country"]'),

      // Checkboxes
      pointOfContactCheckbox: this.page.locator('button[data-test*="isBuyerPrimary"]'),

      // Buttons
      continueButton: this.page.locator('button[title="Continue"]'),
      backButton: this.page.locator('button[title="Back"]'),
    };
  }

  async selectState(state: string): Promise<void> {
    await this.locator.stateDropdown.click();
    await this.page.locator(`//li[@data-test-id="${state}"]`).click();
  }

  async selectCountry(country: string): Promise<void> {
    await this.locator.countryDropdown.click();
    await this.page.locator(`//li[@data-test-id="${country}"]`).click();
  }

  async fillCompanyAddressFields({
    companyLegalName,
    streetAddress,
    suiteBuilding,
    city,
    state,
    zip,
    country,
  }: CompanyAddressFields): Promise<void> {
    await this.locator.companyLegalNameInput.fill(companyLegalName);
    await this.locator.streetAddressInput.fill(streetAddress);
    if (suiteBuilding) await this.locator.suiteBuildingInput.fill(suiteBuilding);
    await this.locator.cityInput.fill(city);
    if (state) await this.selectState(state);
    await this.locator.zipInput.fill(zip);
    if (country) await this.selectCountry(country);
  }

  async fillPointOfContactFields({
    firstName,
    lastName,
    preferredName,
    jobTitle,
    workEmail,
  }: PointOfContactFields): Promise<void> {
    await this.locator.firstNameInput.fill(firstName);
    await this.locator.lastNameInput.fill(lastName);
    if (preferredName) await this.locator.preferredNameInput.fill(preferredName);
    await this.locator.jobTitleInput.fill(jobTitle);
    await this.locator.workEmailInput.fill(workEmail);
  }
}
