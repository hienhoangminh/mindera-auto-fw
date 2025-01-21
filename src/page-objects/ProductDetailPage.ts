import { BasePage } from "./base/BasePage";

export class ProductDetailPage extends BasePage {
  private Elements = {
    productName: (name: string) =>
      `//div[@purchasable]/div[@class='item-detail']/h4[contains(descendant::text(), '${name}')]`,
    addToBagBtn:
      ".product-detail .product-content .add-to-cart .item-selection .cartbutton button",
    quantityDropdown: "//select[contains(@id, 'Quantity')]",
    cartDetail: "table tbody tr[id*='cart-item']",
    cartItemName:
      "table tbody tr[id*='cart-item'] .item .item-detail .item-name a",
    cartItemQuantity: "table tbody tr[id*='cart-item'] .qty .quantity",
  };

  private Text = {
    quantity: (value: string) => `Quantity: ${value}`,
  };

  /**
   * Verify if we are at Product Detail page with correct product name shown
   */

  /**
   * Click on the product with name
   * @param name: the name of product
   */
  public async selectQuantity(quantity: string): Promise<void> {
    await this.selectOption(this.Elements.quantityDropdown, quantity);
  }

  /**
   * Click on the ADD TO BAG button
   */
  public async clickOnAddToBagButton(): Promise<void> {
    await this.waitAndClickBySelector(this.Elements.addToBagBtn);
  }

  /**
   * Wait until page loaded
   */
  public async waitUntilPageLoaded() {
    await this.waitForLoadState();
  }

  public async selectSize(size: string) {
    await this.waitAndClickByRole("button", size, true);
  }

  /**
   * Click on Checkout link
   */
  async clickOnCheckoutLink() {
    await this.waitAndClickByRole("link", "Checkout");
  }
}
