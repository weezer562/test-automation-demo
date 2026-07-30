import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  // Locators for inital Login Page
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly logoutText: Locator;

  // Locators for Shopping Cart Page after successful login
  readonly shoppingCartHeading: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for inital Login Page
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Submit' });
    this.alertMessage = page.getByRole('alert');

    // Locators for Shopping Cart Page after successful login
    this.shoppingCartHeading = page.getByRole('heading', { name: 'SHOPPING CART' });
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    this.logoutText = page.getByRole('link', { name: 'Log Out' });
  }

  async goto() {
    await this.page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutText.click();
  }
}