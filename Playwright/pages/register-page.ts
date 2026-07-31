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
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for inital Register Page
    this.form = page.locator('form[name="registerForm"]');
    this.formHeader = page.locator('h2');

    this.firstNameLabel = page.locator('label[for="firstName"]');
    this.firstNameInput = page.locator('input[id="firstName"]');

    this.lastNameLabel = page.locator('label[for="lastName"]');
    this.lastNameInput = page.locator('input[id="lastName"]');

    this.phoneLabel = page.locator('label[for="phone"]');
    this.phoneInput = page.locator('input[id="phone"]');

    this.countryLabel = page.locator('label[for="countries_dropdown_menu"]');
    this.countryDropdown = page.locator('select[id="countries_dropdown_menu"]');
    this.countryOption = page.locator('option[selected]');

    this.emailLabel = page.locator('label[for="exampleInputEmail1"]');
    this.emailInput = page.locator('input[id="emailAddress"]');
    this.emailValidationMessage = page.locator('input#email[required]:invalid');

    this.passwordLabel = page.locator('label[for="exampleInputPassword1"]');
    this.passwordInput = page.locator('input[name="password"]');

    this.termsAndCondtionsCheckbox = page.locator('input[id="exampleCheck1"]');
    this.termsAndCondtionsLabel = page.locator('label[class="form-check-label"]');

    this.registerButton = page.getByRole('button', { name: 'Submit' });
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