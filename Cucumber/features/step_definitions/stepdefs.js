const assert = require('assert');
const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');

require('chromedriver');

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given("I am on the landing page", async function () {
  await driver.get("https://qa-practice.razvanvancea.ro/auth_ecommerce.html");
});

Then("The page title should be {string}", async function (expectedTitle) {
  const actualTitle = await driver.getTitle();
  assert.strictEqual(actualTitle, expectedTitle);
});

After(async function () {
  await driver.quit();
});

// function isItFriday(today) {
//   // We'll leave the implementation blank for now
//   if (today === "Friday") {
//     return "TGIF";
//   } else {
//     return "Nope";
//   }
// }

// // Given('today is Sunday', function () {
// //   this.today = 'Sunday';
// // });

// // Given('today is Friday', function () {
// //   this.today = 'Friday';
// // });
// // below is moving to variables
// Given('today is {string}', function (givenDay) {
//   this.today = givenDay;
// });

// When('I ask whether it\'s Friday yet', function () {
//   this.actualAnswer = isItFriday(this.today);
// });

// Then('I should be told {string}', function (expectedAnswer) {
//   assert.strictEqual(this.actualAnswer, expectedAnswer);
// });