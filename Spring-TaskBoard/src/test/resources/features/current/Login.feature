Feature: User Login

  Scenario: User can log in with valid credentials
    Given The user is on the login page
    When The user enters valid credentials
    Then The user should be redirected to the dashboard
