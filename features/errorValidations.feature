@app2
Feature: Ecommerce2 Wrong login

    Scenario Outline: Wrong login credentials
        Given I am login to the application2 with "<username>" and "<password>"
        Then I should see the error message containing "Incorrect"

        Examples:
            | username | password |
            | admin    | admin    |
            | admin1   | admin1   |
