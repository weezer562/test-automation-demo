import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  // Locators for inital Register Page
  readonly page: Page;
  readonly form: Locator;
  readonly formHeader: Locator;

  readonly firstNameLabel: Locator;
  readonly firstNameInput: Locator;

  readonly lastNameLabel: Locator;
  readonly lastNameInput: Locator;

  readonly phoneLabel: Locator;
  readonly phoneInput: Locator;

  readonly countryLabel: Locator;
  readonly countryDropdown: Locator;
  readonly countryOption: Locator;

  readonly emailLabel: Locator;
  readonly emailInput: Locator;
  readonly emailValidationMessage: Locator;

  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;

  readonly termsAndCondtionsCheckbox: Locator;
  readonly termsAndCondtionsLabel: Locator;

  readonly registerButton: Locator;
  readonly registerSuccessMessage: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for inital Register Page
    this.form = page.locator('form#registerForm');
    this.formHeader = page.getByRole('heading', { level: 2 });

    this.firstNameLabel = page.getByLabel('First Name');
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });

    this.lastNameLabel = page.getByLabel('Last Name');
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });

    this.phoneLabel = page.getByLabel('Phone number');
    this.phoneInput = page.getByPlaceholder('Enter phone number', { exact: true });

    this.countryLabel = page.getByLabel('Country');
    this.countryDropdown = page.locator('select#countries_dropdown_menu');
    this.countryOption = page.getByRole('option', { selected: true });

    this.emailLabel = page.locator('label[for="exampleInputEmail1"]');
    this.emailInput = page.locator('input[id="emailAddress"]');
    this.emailValidationMessage = page.locator('input#emailAddress[required]:invalid');

    this.passwordLabel = page.locator('label[for="exampleInputPassword1"]');
    this.passwordInput = page.locator('input[name="password"]');

    this.termsAndCondtionsCheckbox = page.getByRole('checkbox', { name: 'I agree with the terms and conditions' });
    this.termsAndCondtionsLabel = page.locator('label[class="form-check-label"]');

    this.registerButton = page.locator('button[type="submit"]');
    this.registerSuccessMessage = page.locator('#message');
    this.alertMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('https://qa-practice.razvanvancea.ro/register.html');
  }

  async register(firstName: string, lastName: string, phone: string, country: string, email: string, password: string, agreeToTerms: boolean) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneInput.fill(phone);
    await this.countryDropdown.selectOption({ label: country });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (agreeToTerms) {
      await this.termsAndCondtionsCheckbox.check();
    }
    await this.registerButton.click();
  }
}