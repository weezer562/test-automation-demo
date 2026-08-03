
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const { Builder, By, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

Before(async function () {
  // Configure Chrome options (e.g., run headless)
  const options = new chrome.Options();
  options.addArguments('--headless=new'); // Remove this line to see the visual browser window

  // Build the driver instance
  this.driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
});

Given("I am able to navigate to the login page", async function () {
  await this.driver.get("https://qa-practice.razvanvancea.ro/auth_ecommerce.html");
});

// Scenario: I am able to navigate to the login page
Then("The page title should be {string}", async function (expectedTitle) {
  const actualTitle = await this.driver.getTitle();
  expect(actualTitle).to.equal(expectedTitle);
});

//Scenario: User is unable to login with invalid credentials
When("I attempt to login with invalid credentials", async function () {
  const email = "bademail";
  const password = "badpassword";
  await this.driver.findElement(By.id("email")).sendKeys(email);
  await this.driver.findElement(By.id("password")).sendKeys(password);
  await this.driver.findElement(By.id("submitLoginBtn")).click();
});

Then("I should see the error message {string}", async function (expectedMessage) {
  const errorMessage = await this.driver.findElement(By.id("message")).getText();
  expect(errorMessage).to.equal(expectedMessage);
});

Then("the alert has the correct class", async function () {
  const alertElement = await this.driver.findElement(By.id("message"));
  const alertClass = await alertElement.getAttribute("class");
  expect(alertClass).to.equal("alert alert-danger");
});

Then("the alert has the correct color {string}", async function (expectedColor) {
  const alertElement = await this.driver.findElement(By.id("message"));
  const actualColor = await alertElement.getCssValue("color");
  expect(actualColor).to.equal(expectedColor);
});

// Scenario: User is able to login with valid credentials
When("I enter {string} and {string}", async function (email, password) {
  await this.driver.findElement(By.id("email")).sendKeys(email);
  await this.driver.findElement(By.id("password")).sendKeys(password);
  await this.driver.findElement(By.id("submitLoginBtn")).click();
});

Then("I should see the Shopping Cart page", async function () {
  const shoppingCartHeadeing = await this.driver.findElement(By.className("section-header")).getText();
  expect(shoppingCartHeadeing).to.equal("SHOPPING CART");
});

//Scenario: Shopping Cart proceed to Checkout button is enabled
Then("should have text {string} on the button", async function (expectedText) {
  loginWithValidCredentials(this.driver);
  //wait for the page to load after login
  await this.driver.sleep(4000);
  const proceedToCheckoutButton = await this.driver.findElement(By.className("btn btn-primary btn-purchase"));
  const actualText = await proceedToCheckoutButton.getText();
  expect(actualText).to.equal(expectedText);
});

Then("should be enabled", async function () {
  const proceedToCheckoutButton = await this.driver.findElement(By.className("btn btn-primary btn-purchase"));
  const isEnabled = await proceedToCheckoutButton.isEnabled();
  expect(isEnabled).to.be.true;
});

// Scenario: User is able to logout successfully
When("I click on the logout button", async function () {
  loginWithValidCredentials(this.driver);
  //wait for the page to load after login
  await this.driver.sleep(4000); // Wait for the page to load after login
  const logoutButton = await this.driver.findElement(By.id("logout"));
  await logoutButton.click();
});

Then("I should be redirected to the login page", async function () {
  const currentUrl = await this.driver.getCurrentUrl();
  expect(currentUrl).to.equal("https://qa-practice.razvanvancea.ro/auth_ecommerce.html");
});

Then("I should see the email input field", async function () {
  const emailInput = await this.driver.findElement(By.id("email"));
  const isDisplayed = await emailInput.isDisplayed();
  expect(isDisplayed).to.be.true;
});

Then("I should see the password input field", async function () {
  const passwordInput = await this.driver.findElement(By.id("password"));
  const isDisplayed = await passwordInput.isDisplayed();
  expect(isDisplayed).to.be.true;
});

After(async function () {
  await this.driver.quit();
});

function loginWithValidCredentials(driver) {
  return driver.get("https://qa-practice.razvanvancea.ro/auth_ecommerce.html")
    .then(() => driver.findElement(By.id("email")).sendKeys("admin@admin.com"))
    .then(() => driver.findElement(By.id("password")).sendKeys("admin123"))
    .then(() => driver.findElement(By.id("submitLoginBtn")).click());
} 