import { BasePage } from "./base/BasePage";

export class CheckoutPage extends BasePage {
  private Elements = {
    productName:
      ".item-container-wrapper .table-container .summary-table tbody tr td.item .item-detail .item-name a",
    productQuantity:
      ".item-container-wrapper .table-container .summary-table tbody tr td.qty input[name='quantity']",
  };

  /**
   * Get the name of product
   */
  public async getProductName(): Promise<string> {
    return await this.getTextContentOfElement(this.Elements.productName);
  }

  /**
   * Get the quantity of product
   */
  public async getProductQuantity(): Promise<string> {
    return (
      (await this.waitAndExtractAttributeValue(
        this.Elements.productQuantity,
        "value"
      )) ?? ""
    );
  }
}
