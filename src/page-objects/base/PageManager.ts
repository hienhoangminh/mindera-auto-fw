import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { ProductDetailPage } from "../ProductDetailPage";
import { ProductListPage } from "../ProductListPage";
import { HomePage } from "../HomePage";
import { CheckoutPage } from "../CheckoutPage";

export class PageManager {
  get page(): Page {
    return pageFixture.page;
  }

  createBasePage(): BasePage {
    return new BasePage();
  }

  createHomePage(): HomePage {
    return new HomePage();
  }

  createProductDetailPage(): ProductDetailPage {
    return new ProductDetailPage();
  }
  createProductListPage(): ProductListPage {
    return new ProductListPage();
  }

  createCheckoutPage(): CheckoutPage {
    return new CheckoutPage();
  }
}
