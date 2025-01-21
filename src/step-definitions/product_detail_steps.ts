import { Then, When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/cucumberWorld";
import { logger } from "../logger/logger";
import { expect } from "@playwright/test";

When(
  "I select {string} item for the selected product",
  async function (this: CucumberWorld, quantity: string) {
    try {
      logger.info(`Select ${quantity} item(s) for the selected product...`);
      this.setQuantity(quantity);
      await this.productDetailPage.selectQuantity(quantity);
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

When(
  "I select the size {string} for selected product",
  async function (this: CucumberWorld, size: string) {
    try {
      logger.info(`Select the size ${size} for selected product...`);
      this.setSize(size);
      await this.productDetailPage.selectSize(size);
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

When("I click on ADD TO BAG button", async function (this: CucumberWorld) {
  try {
    logger.info(`Click on ADD TO BAG button...`);
    await this.productDetailPage.clickOnAddToBagButton();
  } catch (error: any) {
    if (error instanceof Error) {
      logger.error("An error has occurred: ", error.message);
    } else if (typeof error === "string") {
      logger.error("An unknown error occurred: ", error);
    } else {
      logger.error("An unknown error occurred: ", JSON.stringify(error));
    }
  }
});

When("I click on Checkout link", async function (this: CucumberWorld) {
  try {
    logger.info(`Click on cart icon link...`);
    await this.productDetailPage.clickOnCheckoutLink();
  } catch (error: any) {
    if (error instanceof Error) {
      logger.error("An error has occurred: ", error.message);
    } else if (typeof error === "string") {
      logger.error("An unknown error occurred: ", error);
    } else {
      logger.error("An unknown error occurred: ", JSON.stringify(error));
    }
  }
});

// Then(
//   "I should be able to see selected product with selected quantity equals to {string}",
//   async function (this: CucumberWorld, quantity: string) {
//     try {
//       logger.info(`Verify if quantity shown is correct...`);
//       await this.productDetailPage.waitForFixedTime(5);
//       await this.productDetailPage.hoverOnCartIconIfNeeds();
//       await this.productDetailPage.waitForLoadState();
//       expect(await this.productDetailPage.getProductQuantity()).toEqual(
//         quantity
//       );
//       expect(await this.productDetailPage.getProductName()).toEqual(
//         this.getProductName()
//       );
//     } catch (error: any) {
//       if (error instanceof Error) {
//         logger.error("An error has occurred: ", error.message);
//       } else if (typeof error === "string") {
//         logger.error("An unknown error occurred: ", error);
//       } else {
//         logger.error("An unknown error occurred: ", JSON.stringify(error));
//       }
//     }
//   }
// );
