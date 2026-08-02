import { test, expect } from "@playwright/test";
import { RecoverPasswordPage } from "../../pages/recover-password-page";

let recoverPasswordPage: RecoverPasswordPage;

test.describe("Recover Password Page", () => {
  test.beforeEach(async ({ page }) => {
    recoverPasswordPage = new RecoverPasswordPage(page);
    await recoverPasswordPage.goto();
  });

  test("Handle no email input", {
    tag: ["@smoke"] }, async () => {
      await recoverPasswordPage.recoverPassword("");
      await expect(recoverPasswordPage.successfulRequestMessage).not.toBeVisible();
  });

  test("Recover Password", {
    tag: ["@smoke"] }, async () => {
      await recoverPasswordPage.recoverPassword("test@example.com");
      await expect(recoverPasswordPage.successfulRequestMessage).toBeVisible();
  });
});
