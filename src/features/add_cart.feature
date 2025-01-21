@regression @cart
Feature: David Jones - Add product to cart

  Background: Pre-conditions:
    Given I navigate to David Jones page
    Then I should be able to see page title is "David Jones | Shop Fashion, Beauty, Homewares, Gifts & More"

  Scenario Outline: Add product with only 1 size to bag
    When I hover on category with name "<categoryName>"
    And I click on product type with name "<productType>"
    Then I should be able to see page title is "<productListTitle>"
    When I click on product with name "<productName>"
    Then I should be able to see page title is "<productDetailTitle>"
    When I select "<quantity>" item for the selected product
    And I click on ADD TO BAG button
    And I click on Checkout link
    Then I should be able to see selected product with selected quantity equals to "<quantity>"

    Examples:
      | categoryName        | productType | productListTitle                            | productName       | productDetailTitle                         | quantity |
      | Shoes & Accessories | Wallet      | Shop Men's Wallets Australia \| David Jones | JOHHNN CARDHOLDER | Ted Baker Johhnn Cardholder \| David Jones |        3 |

  Scenario Outline: Add product with multiple sizes to bag
    When I hover on category with name "<categoryName>"
    And I click on product type with name "<productType>"
    Then I should be able to see page title is "<productListTitle>"
    When I click on product with name "<productName>"
    Then I should be able to see page title is "<productDetailTitle>"
    When I select the size "<size>" for selected product
    And I select "<quantity>" item for the selected product
    And I click on ADD TO BAG button
    And I click on Checkout link
    Then I should be able to see selected product with selected quantity equals to "<quantity>"

    Examples:
      | categoryName | productType | productListTitle                                   | productName             | productDetailTitle                            | size | quantity |
      | Women        | Bras        | Women's Bras: Strapless Bras & More \| David Jones | UNDERSTATE SEAMLESS BRA | Berlei Understate Seamless Bra \| David Jones | M    |        2 |
