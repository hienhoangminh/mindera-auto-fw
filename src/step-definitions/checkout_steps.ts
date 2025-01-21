import { Then, When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/cucumberWorld";
import { logger } from "../logger/logger";
import { expect } from "@playwright/test";

Then(
  "I should be able to see selected product with selected quantity equals to {string}",
  async function (this: CucumberWorld, quantity: string) {
    try {
      logger.info(`Verify if quantity shown is correct...`);
      let productName = await this.checkoutPage.getProductName();
      let producQuantity = await this.checkoutPage.getProductQuantity();
      expect(productName).toEqual(this.getProductName());
      expect(producQuantity).toEqual(quantity);
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
