import { test, expect } from '@playwright/test';

test.describe('Register User', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://qa-practice.razvanvancea.ro/register.html');
  });

  test('Register Form is loaded', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('form[name="registerForm"]')).toBeVisible();
  });
  
  test('Register Form Header is loaded', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Register Form');
  });

  test('First name field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[for="firstName"]')).toHaveText('First Name');
    await expect(page.locator('input[id="firstName"]')).toBeVisible();
    await expect(page.locator('input[id="firstName"]')).toHaveAttribute('type', 'text');
    await expect(page.locator('input[id="firstName"]')).toHaveAttribute('placeholder', 'Enter first name');
  });

  test('Last name field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => { 
    await expect(page.locator('label[for="lastName"]')).toHaveText('Last Name');
    await expect(page.locator('input[id="lastName"]')).toBeVisible();
    await expect(page.locator('input[id="lastName"]')).toHaveAttribute('type', 'text');
    await expect(page.locator('input[id="lastName"]')).toHaveAttribute('placeholder', 'Enter last name');
  });

  test('Phone field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[for="phone"]')).toHaveText('Phone Number');
    await expect(page.locator('input[id="phone"]')).toBeVisible();
    await expect(page.locator('input[id="phone"]')).toHaveAttribute('type', 'text');
    await expect(page.locator('input[id="phone"]')).toHaveAttribute('placeholder', 'Enter phone number');
  });

  test('Country dropdown is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[for="countries_dropdown_menu"]')).toHaveText('Country');
    await expect(page.locator('select[id="countries_dropdown_menu"]')).toBeVisible();
    await expect(page.locator('option[selected]')).toHaveText('Select a country...');
    await expect(page.locator('select[id="countries_dropdown_menu"]')).toHaveAttribute('placeholder', 'Select a country...');
  });

  test('Email field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[for="exampleInputEmail1"]')).toHaveText('Email address *');
    await expect(page.locator('input[id="emailAddress"]')).toBeVisible();
    await expect(page.locator('input[id="emailAddress"]')).toHaveAttribute('type', 'email');
    await expect(page.locator('input[id="emailAddress"]')).toHaveAttribute('placeholder', 'Enter email');
  });

  test('Password field is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[for="exampleInputPassword1"]')).toHaveText('Password *');
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    await expect(page.locator('input[id="password"]')).toHaveAttribute('placeholder', 'Password');
  });

  test('Terms and Conditions checkbox is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('label[class="form-check-label"]')).toHaveText('I agree with the terms and conditions');
    await expect(page.locator('input[id="exampleCheck1"]')).toBeVisible();
    await expect(page.locator('input[id="exampleCheck1"]')).toHaveAttribute('type', 'checkbox');
  });

  test('Register button is correctly displayed', { tag: ['@smoke']}, async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Register');
    await expect(page.locator('button[id="registerBtn"]')).toHaveAttribute('onclick', 'registerAccount()');
  });

  test('Unable to register with invalid email', { tag: ['@smoke', '@current']}, async ({ page }) => {
    await page.locator('input[id="firstName"]').fill('kobe');
    await page.locator('input[id="lastName"]').fill('bryant');
    await page.locator('input[id="phone"]').fill('1234567890');
    await page.locator('select[id="countries_dropdown_menu"]').selectOption({ label: 'United States of America' });
    await page.locator('input[id="emailAddress"]').fill('invalidemail');
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('input[id="exampleCheck1"]').check();
    await page.locator('button[type="submit"]').click();

    //Assertions
    await page.locator('input#email[required]:invalid');

    const validationMessage = await page.locator('input#email[required]:invalid').evaluate((input) => input.validationMessage);
    console.log('Validation message:', validationMessage);
    expect(validationMessage).toContain("Please include an '@' in the email address. 'x' is missing an '@'.");
    // await expect(page.locator('#message')).toBeVisible();
    // await expect(page.locator('#message')).toHaveText('Please enter a valid email address.');
  });

  test('Unable to register with empty email field', { tag: ['@smoke']}, async ({ page }) => {
    await page.locator('button[type="submit"]').click();

    // Assertions for error message
    const isEmailEmpty = await page.locator('input[id="emailAddress"]').evaluate((input) => input.validity.valueMissing);
    expect(isEmailEmpty).toBe(true);
    });

  test('Unable to register without agreeing to terms and conditions', { tag: ['@smoke']}, async ({ page }) => {
    await page.locator('input[id="firstName"]').fill('John');
    await page.locator('input[id="lastName"]').fill('Doe');
    await page.locator('input[id="phone"]').fill('1234567890');
    await page.locator('select[id="countries_dropdown_menu"]').selectOption({ label: 'United States of America' });
    await page.locator('input[id="emailAddress"]').fill('john.doe@example.com');
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();

    // Assertions for error message
    const isTermsUnchecked = await page.locator('input[id="exampleCheck1"]').evaluate((input) => !input.checked);
    expect(isTermsUnchecked).toBe(true);
  });
});

