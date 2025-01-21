import { Then, When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/cucumberWorld";
import { logger } from "../logger/logger";

When(
  "I click on product with name {string}",
  async function (this: CucumberWorld, productName: string) {
    try {
      logger.info(`Click on product with name ${productName}...`);
      this.setProductName(productName);
      await this.productListPage.clickOnProductName(productName);
    } catch (error: any) {
      if (error instanceof Error) {
        logger.error("An error has occurred: ", error.message);
      } else if (typeof error === "string") {
        logger.error("An unknown error occurred: ", error);
      } else {
        logger.error("An unknown error occurred: ", JSON.stringify(error));
      }
    }
  }
);
