import { Page } from "@playwright/test";
import { config as loadEnv } from "dotenv";

//// MAKE SURE that Cucumber timeouts > Playwright timeouts
const env = loadEnv({ path: "./env/.env" });

/**
 * Set the timeout for navigation and command
 * @param page : the Page instance
 */
export function setGlobalSettings(page: Page) {
  const navigationTimeout = parseInt(env.parsed?.NAVIGATION_TIMEOUT || "50000");
  const commandTimeout = parseInt(env.parsed?.COMMAND_TIMEOUT || "30000");

  // set global 'navigation' timeout to 50s
  // Override global navigation timeout, such as:
  // await page.goto("https://example.com", {timeout: 60000});
  page.setDefaultNavigationTimeout(navigationTimeout);

  // set global 'command' timeout
  // Override global command timeout, such as:
  // await page.waitForSelect('#my-element', {timeout: 30000});
  // await page.type('#my-input', 'Hello World!',{timeout: 30000});
  // await page.click('#my-button', {timeout: 30000});
  page.setDefaultTimeout(commandTimeout);
}
