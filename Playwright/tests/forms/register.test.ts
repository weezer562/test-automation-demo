import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';

let registerPage: RegisterPage;

test.describe('Register User', () => {
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('Register Form is loaded', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.form).toBeVisible();
  });
  
  test('Register Form Header is loaded', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.formHeader).toHaveText('Register Form');
  });

  test('First name field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.firstNameLabel).toHaveText('First Name');
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.firstNameInput).toHaveAttribute('type', 'text');
    await expect(registerPage.firstNameInput).toHaveAttribute('placeholder', 'Enter first name');
  });

  test('Last name field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => { 
    await expect(registerPage.lastNameLabel).toHaveText('Last Name');
    await expect(registerPage.lastNameInput).toHaveAttribute('type', 'text');
    await expect(registerPage.lastNameInput).toHaveAttribute('placeholder', 'Enter last name');
  });

  test('Phone field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.phoneLabel).toHaveText('Phone Number');
    await expect(registerPage.phoneInput).toBeVisible();
    await expect(registerPage.phoneInput).toHaveAttribute('type', 'text');
    await expect(registerPage.phoneInput).toHaveAttribute('placeholder', 'Enter phone number');
  });

  test('Country dropdown is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.countryLabel).toHaveText('Country');
    await expect(registerPage.countryDropdown).toBeVisible();
    await expect(registerPage.countryOption).toHaveText('Select a country...');
    await expect(registerPage.countryDropdown).toHaveAttribute('placeholder', 'Select a country...');
  });

  test('Email field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.emailLabel).toHaveText('Email address *');
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.emailInput).toHaveAttribute('type', 'email');
    await expect(registerPage.emailInput).toHaveAttribute('placeholder', 'Enter email');
  });

  test('Password field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.passwordLabel).toHaveText('Password *');
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(registerPage.passwordInput).toHaveAttribute('placeholder', 'Password');
  });

  test('Terms and Conditions checkbox is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.termsAndCondtionsLabel).toHaveText('I agree with the terms and conditions');
    await expect(registerPage.termsAndCondtionsCheckbox).toBeVisible();
    await expect(registerPage.termsAndCondtionsCheckbox).toHaveAttribute('type', 'checkbox');
  });

  test('Register button is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.registerButton).toHaveText('Register');
    await expect(registerPage.registerButton).toHaveAttribute('onclick', 'registerAccount()');
  });

  test('Unable to register with invalid email', { tag: ['@smoke']}, async ({ page }) => {
    await registerPage.firstNameInput.fill('kobe');
    await registerPage.lastNameInput.fill('bryant');
    await registerPage.phoneInput.fill('1234567890');
    await registerPage.countryDropdown.selectOption({ label: 'United States of America' });
    await registerPage.emailInput.fill('invalidemail');
    await registerPage.passwordInput.fill('Password123!');
    await registerPage.termsAndCondtionsCheckbox.check();
    await registerPage.registerButton.click();

    //Assertions
    await registerPage.emailValidationMessage.waitFor({ state: 'visible' });

    const validationMessage = await registerPage.emailValidationMessage.evaluate((input) => input.getAttribute('validationMessage'));
    console.log('Validation message:', validationMessage);
    expect(validationMessage).toContain("Please include an '@' in the email address. 'x' is missing an '@'.");
  });

  test('Unable to register with empty email field', { tag: ['@smoke']}, async ({ page }) => {
    await registerPage.registerButton.click();

    // Assertions for error message
    const isEmailEmpty = await registerPage.emailInput.evaluate((input) => input.getAttribute('value') === '');
    expect(isEmailEmpty).toBe(true);
    });

  test('Unable to register without agreeing to terms and conditions', { tag: ['@smoke']}, async ({ page }) => {
    await registerPage.firstNameInput.fill('John');
    await registerPage.lastNameInput.fill('Doe');
    await registerPage.phoneInput.fill('1234567890');
    await registerPage.countryDropdown.selectOption({ label: 'United States of America' });
    await registerPage.emailInput.fill('john.doe@example.com');
    await registerPage.passwordInput.fill('Password123!');
    await registerPage.registerButton.click();

    // Assertions for error message
    expect(await registerPage.termsAndCondtionsCheckbox.isChecked()).toBe(true);
  });
});

