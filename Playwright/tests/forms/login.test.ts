// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

let loginPage: LoginPage;

test.describe('Login Validation', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Has Correct Page Title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("QA Practice | Learn with RV");

  });

  test('Handle Invalid Login', {
    tag: ['@smoke'],
  }, async ({ page }) => {
    //Invalid Login
    await loginPage.login('bademail', 'badpassword');

    // Error message assertions
    await expect(loginPage.alertMessage).toBeVisible();
    await expect(loginPage.alertMessage).toHaveText('Bad credentials! Please try again! Make sure that you\'ve registered.');
    await expect(loginPage.alertMessage).toHaveClass(/alert alert-danger/);
    await expect(loginPage.alertMessage).toHaveCSS('color', 'rgb(114, 28, 36)');
    await expect(loginPage.alertMessage).toHaveAttribute('id', 'message');

  });

  test('Handle Valid Login', {
    tag: ['@smoke'],
  },
    async ({ page }) => {
    //Valid Login
    await loginPage.login('admin@admin.com', 'admin123');

    // Assertions for new page after successfully login
    await expect(loginPage.shoppingCartHeading).toBeVisible();
    await expect(loginPage.shoppingCartHeading).toHaveText('SHOPPING CART');

    // Assertions for the "PROCEED TO CHECKOUT" button after succesfully login
    await expect(loginPage.proceedToCheckoutButton).toBeVisible();
    await expect(loginPage.proceedToCheckoutButton).toHaveText('PROCEED TO CHECKOUT');
    await expect(loginPage.proceedToCheckoutButton).toBeEnabled();

  });

  test('Handle Logout', {
    tag: ['@smoke'],
  },
    async ({ page }) => {
    // Logout
    await loginPage.login('admin@admin.com', 'admin123');
    await loginPage.logout();

    // Assertions for logout
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
