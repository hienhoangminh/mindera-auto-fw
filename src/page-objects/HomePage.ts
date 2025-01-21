import { BasePage } from "./base/BasePage";

export class HomePage extends BasePage {
  private Elements = {
    categoryOption: (name: string) =>
      `//nav[@id='header-nav']/div[@class='header-nav-container']/ul/li[descendant::text()='${name}']`,
    productOption: (categoryName: string, productType: string) =>
      `//nav[@id='header-nav']/div[@class='header-nav-container']/ul/li[contains(descendant::text(), ${categoryName})]/div[@class='submenu']/div[@class='submenu-content']/ul/li[contains(descendant::text(), ${productType})]`,
  };

  /**
   * Hover on category option with name
   * @param name: the name of category
   */
  public async hoverOnParentCategory(name: string): Promise<void> {
    await this.waitAndHoverOnElement(this.Elements.categoryOption(name));
  }

  /**
   * Click on the product type
   * @param productType: the name of product type
   */
  public async clickOnProductType(productType: string): Promise<void> {
    await this.waitAndClickByRole("link", productType);
  }

  /**
   * Wait until page loaded
   */
  public async waitUntilPageLoaded() {
    await this.waitForLoadState();
  }
}
