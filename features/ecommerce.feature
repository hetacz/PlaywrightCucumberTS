@regression
Feature: Ecommerce Validations

    Scenario: Placing the order in app1
        Given I am login to the application with "qwe123@pl.pl" and "Qqq111!!!"
        When I add "zara coat 3" to the cart
        Then Verify "zara coat 3" is displayed in the cart page
        When I enter valid details in the Place the Order page
        Then Verify order is present in the Order History page

    Scenario Outline: Wrong login credentials to app2
        Given I am login to the application2 with "<username>" and "<password>"
        Then I should see the error message containing "Incorrect"

        Examples:
            | username | password |
            | admin    | admin    |
            | admin1   | admin1   |
