Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

#   Scenario: Sunday isn't Friday
#     Given today is Sunday
#     When I ask whether it's Friday yet
#     Then I should be told "Nope"

#  Scenario: Friday is Friday
#     Given today is Friday
#     When I ask whether it's Friday yet
#     Then I should be told "TGIF"
# Moving to variables below

  # Scenario Outline: Today is or is not Friday
  #   Given today is "<day>"
  #   When I ask whether it's Friday yet
  #   Then I should be told "<answer>"

  # Examples:
  #   | day            | answer |
  #   | Friday         | TGIF   |
  #   | Sunday         | Nope   |
  #   | anything else! | Nope   |

  Scenario: Page title is correct
    Given I am on the landing page
    Then The page title should be "QA Practice | Learn with RV"

  # Scenario Outline: Invalid Login is Handled
  # Given I am on the login page
  # When I enter "<username>" and "<password>"
  # Then I should see the error message "Bad credentials! Please try again! Make sure that you\'ve registered."
  # And I should see the correct alert
  # And The alert should have the correct class
  # And The alert should have the color 'rgb(114, 28, 36)'
  # And The alert should have the id 'message'
