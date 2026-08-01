import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/register-page";

let registerPage: RegisterPage;

test.describe("Register User", () => {
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  // Form Tests
  test("Register Form is loaded", {
    tag: ["@smoke"],
  }, async ({ page }) => {
    await expect(registerPage.form).toBeVisible();
  });

  test("Register Form Header is loaded", {
    tag: ["@smoke"],
  }, async ({ page }) => {
    await expect(registerPage.formHeader).toHaveText("Register Form");
  });

  test("First name field is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.firstNameLabel).toHaveText("First Name");
      await expect(registerPage.firstNameInput).toBeVisible();
      await expect(registerPage.firstNameInput).toHaveAttribute("type", "text");
      await expect(registerPage.firstNameInput).toHaveAttribute("placeholder","Enter first name");
  });


  test("Last name field is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.lastNameLabel).toHaveText("Last Name");
      await expect(registerPage.lastNameInput).toBeVisible();
      await expect(registerPage.lastNameInput).toHaveAttribute("type", "text");
      await expect(registerPage.lastNameInput).toHaveAttribute("placeholder", "Enter last name");
  });

  test("Phone field is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.phoneLabel).toHaveText("Phone Number");
      await expect(registerPage.phoneInput).toBeVisible();
      await expect(registerPage.phoneInput).toHaveAttribute("type", "text");
      await expect(registerPage.phoneInput).toHaveAttribute("placeholder", "Enter phone number");
  });

  test("Country dropdown is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.countryLabel).toHaveText("Country");
      await expect(registerPage.countryDropdown).toBeVisible();
      await expect(registerPage.countryOption).toHaveText("Select a country...");
      await expect(registerPage.countryDropdown).toHaveAttribute("placeholder", "Select a country...");
  });

  test("Email field is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.emailLabel).toHaveText("Email address *");
      await expect(registerPage.emailInput).toBeVisible();
      await expect(registerPage.emailInput).toHaveAttribute("type", "email");
      await expect(registerPage.emailInput).toHaveAttribute("placeholder", "Enter email");
  });

  test("Password field is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.passwordLabel).toHaveText("Password *");
      await expect(registerPage.passwordInput).toBeVisible();
      await expect(registerPage.passwordInput).toHaveAttribute("type", "password");
      await expect(registerPage.passwordInput).toHaveAttribute("placeholder", "Password");
  });

  test("Terms and Conditions checkbox is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.termsAndCondtionsLabel).toHaveText("I agree with the terms and conditions");
      await expect(registerPage.termsAndCondtionsCheckbox).toBeVisible();
      await expect(registerPage.termsAndCondtionsCheckbox).toHaveAttribute("type", "checkbox");
  });

  test("Register button is correctly displayed", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await expect(registerPage.registerButton).toBeVisible();
      await expect(registerPage.registerButton).toHaveText("Register");
      await expect(registerPage.registerButton).toHaveAttribute("onclick", "registerAccount()");
  });

  test("Unable to register with invalid email", {
    tag: ["@smoke", "@current"],
  }, async ({ page }) => {
      // Register with invalid email
      await registerPage.register(
        "John",
        "Doe",
        "1234567890",
        "United States of America",
        "invalidemail",
        "Password123!",
        true,
      );

      //Assertions
      expect(registerPage.registerSuccessMessage).toBeHidden();

      // Browser validation message for invalid email
      const validationMessage = await registerPage.emailInput.evaluate((element: HTMLInputElement) => element.validationMessage);
      expect(validationMessage).toContain("Please include an '@' in the email address. 'invalidemail' is missing an '@'.");
  });

  test("Unable to register with empty email field", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      await registerPage.registerButton.click();

      // Assertions for error message
      const validationMessage = await registerPage.emailInput.evaluate((element: HTMLInputElement) => element.validationMessage);
      console.log("Validation message:", validationMessage);
      expect(validationMessage).toContain("Please fill out this field.");
  });

  test("Unable to register without agreeing to terms and conditions", {
    tag: ["@smoke"],
  }, async ({ page }) => {
      // Register with invalid email
      await registerPage.register(
        "John",
        "Doe",
        "1234567890",
        "United States of America",
        "john.doe@example.com",
        "Password123!",
        false,
      );

      //Assertions
      expect(registerPage.registerSuccessMessage).toBeHidden();
  });
});
