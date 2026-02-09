// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
  });

  test('Has Correct Page Title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("QA Practice | Learn with RV");
  });

  test('Handle Invalid Login', async ({ page }) => {
    //Invalid Login
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('bademail');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('badpassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Error message assertions
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText('Bad credentials! Please try again! Make sure that you\'ve registered.');
    await expect(page.getByRole('alert')).toHaveClass(/alert alert-danger/);
    await expect(page.getByRole('alert')).toHaveCSS('color', 'rgb(114, 28, 36)');
    await expect(page.getByRole('alert')).toHaveAttribute('id', 'message');

  });

  test('Handle Valid Login', async ({ page }) => {
    //Valid Login
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Assertions for new page after successfully login
    await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toHaveText('SHOPPING CART');

    // Assertions for the "PROCEED TO CHECKOUT" button after succesfully login
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toHaveText('PROCEED TO CHECKOUT');
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeEnabled();

  });
});
