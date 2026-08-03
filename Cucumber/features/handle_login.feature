Feature: Handle login functionality
  Are we able to login with valid credentials and unable to login with invalid credentials

  Scenario: I am able to navigate to the login page
    Given I am able to navigate to the login page
    Then The page title should be "QA Practice | Learn with RV"

  Scenario: User is unable to login with invalid credentials
    Given I am able to navigate to the login page
    When I attempt to login with invalid credentials
    Then I should see the error message "Bad credentials! Please try again! Make sure that you've registered."
    And the alert has the correct class
    And the alert has the correct color 'rgba(114, 28, 36, 1)'
    
  Scenario: User is able to login with valid credentials
    Given I am able to navigate to the login page
    When I enter "admin@admin.com" and "admin123"
    Then I should see the Shopping Cart page

  Scenario: Shopping Cart proceed to Checkout button is enabled
    Given I am able to navigate to the login page
    Then should have text "PROCEED TO CHECKOUT" on the button
    And should be enabled
  
  Scenario: User is able to logout successfully
      Given I am able to navigate to the login page
      When I click on the logout button
      Then I should be redirected to the login page
      And I should see the email input field
      And I should see the password input field