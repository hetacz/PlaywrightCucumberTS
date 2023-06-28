Feature: Ecommerce Validations

    Background: Open the browser
        Given I open the browser

    Scenario: Placing the order
        Given I am login to the application with "qwe123@pl.pl" and "Qqq111!!!"
        When I add "zara coat 3" to the cart
        Then Verify "zara coat 3" is displayed in the cart page
        When I enter valid details in the Place the Order page
        Then Verify order is present in the Order History page
