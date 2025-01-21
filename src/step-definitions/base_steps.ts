import { Given, Then } from "@cucumber/cucumber";
import { config as loadEnv } from "dotenv";
import { logger } from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

// Load the configuration from .env file
const env = loadEnv({ path: "../../env/.env" });
const url = env.parsed?.URL!;
const URL = "https://www.davidjones.com/";

Given("I navigate to David Jones page", async function (this: CucumberWorld) {
  try {
    logger.info(`Navigating to url ${URL}....`);
    await this.basePage.navigate(URL);
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

Then(
  "I should be able to see page title is {string}",
  async function (this: CucumberWorld, expectedTitle: string) {
    try {
      logger.info(`Verifying the title of current page...`);
      await this.basePage.verifyIfPageTitleCorrect(expectedTitle);
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
