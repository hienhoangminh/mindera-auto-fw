import { expect } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class ProductListPage extends BasePage {
  private Elements = {
    productName: (name: string) =>
      `//div[@purchasable]/div[@class='item-detail']/h4[contains(descendant::text(), '${name}')]`,
  };

  /**
   * Click on the product with name
   * @param name: the name of product
   */
  public async clickOnProductName(name: string): Promise<void> {
    await this.waitAndClickBySelector(this.Elements.productName(name));
  }
}
