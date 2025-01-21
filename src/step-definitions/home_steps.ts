import { Then, When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/cucumberWorld";
import { logger } from "../logger/logger";

When(
  "I hover on category with name {string}",
  async function (this: CucumberWorld, parentCategory: string) {
    try {
      logger.info(`Hover on the category with name ${parentCategory}...`);
      this.setCategory(parentCategory);
      await this.homePage.hoverOnParentCategory(parentCategory);
      await this.homePage.waitUntilPageLoaded();
    } catch (error) {
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
  "I click on product type with name {string}",
  async function (this: CucumberWorld, productType: string) {
    try {
      console.log("Category ", this.getCategory());
      logger.info(`Click on product type with name ${productType}...`);
      this.setProductType(productType);
      await this.homePage.clickOnProductType(productType);
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
