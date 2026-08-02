import { expect, type Locator, type Page } from '@playwright/test';

export class RecoverPasswordPage {
  // Locators for inital Login Page
  readonly page: Page;
  readonly recoverPasswordHeader: Locator;
  readonly emailInput: Locator;
  readonly emailLabel: Locator;
  readonly recoverPasswordButton: Locator;
  readonly successfulRequestMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for inital Login Page
    this.recoverPasswordHeader = page.getByRole('heading', { name: 'Recover Password' });
    this.emailLabel = page.getByLabel('Please enter your email address to recover your password');
    this.emailInput = page.getByPlaceholder('Enter email', { exact: true });
    this.recoverPasswordButton = page.getByRole('button', { name: 'Recover Password' });
    this.successfulRequestMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('https://qa-practice.razvanvancea.ro/recover-password.html');
  }

  async recoverPassword(username: string) {
    await this.emailInput.fill(username);
    await this.recoverPasswordButton.click();
  }
}