import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { BasePage } from "../../page-objects/base/BasePage";
import { ProductListPage } from "../../page-objects/ProductListPage";
import { ProductDetailPage } from "../../page-objects/ProductDetailPage";
import { HomePage } from "../../page-objects/HomePage";
import { PageManager } from "../../page-objects/base/PageManager";
import { CheckoutPage } from "../../page-objects/CheckoutPage";

export class CucumberWorld extends World {
  public pageManager: PageManager; // can be accessible from outside of the class
  public basePage: BasePage; // can be accessible from outside of the class
  public productListPage: ProductListPage;
  public productDetailPage: ProductDetailPage;
  public homePage: HomePage;
  public checkoutPage: CheckoutPage;
  private parentCategory?: string;
  private productType?: string;
  private productName?: string;
  private quantity?: string;
  private size?: string;

  constructor({ attach, log, parameters, link }: IWorldOptions) {
    super({ attach, log, parameters, link });
    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
    this.productListPage = this.pageManager.createProductListPage();
    this.productDetailPage = this.pageManager.createProductDetailPage();
    this.checkoutPage = this.pageManager.createCheckoutPage();
  }

  /**
   * Set the value for attribute parentCategory
   * @param parentCategory: the value of parent category
   */
  setCategory(parentCategory: string) {
    this.parentCategory = parentCategory;
  }

  /**
   * Get the value of attribute parentCategory
   * @returns parentCategory
   */
  getCategory() {
    return this.parentCategory;
  }

  /**
   * Set the value for attribute productType
   * @param productType: the value of productType
   */
  setProductType(productType: string) {
    this.productType = productType;
  }

  /**
   * Get the value of attribute productType
   * @returns productType
   */
  getProductType() {
    return this.productType;
  }

  /**
   * Set the value of attribute productName
   * @param productName : the value of productName
   */
  setProductName(productName: string) {
    this.productName = productName;
  }

  /**
   * Get the value of attribute productName
   * @returns productName
   */
  getProductName() {
    return this.productName;
  }

  /**
   * Set the value of attribute quantity
   * @param quantity : the value of quantity
   */
  setQuantity(quantity: string) {
    this.quantity = quantity;
  }

  /**
   * Get the value of attribute quantity
   * @returns quantity
   */
  getQuantity() {
    return this.quantity;
  }

  /**
   * Set the value of attribute size
   * @param quantity : the value of size
   */
  setSize(size: string) {
    this.size = size;
  }

  /**
   * Get the value of attribute size
   * @returns size
   */
  getSize() {
    return this.size;
  }
}

setWorldConstructor(CucumberWorld);
