import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { config as loadEnv } from "dotenv";
import { pageFixture } from "./browserContextFixture";
import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";

// Load the configuration from .env file
const env = loadEnv({ path: "./env/.env" });
// Fetch the content from .env file
const config = {
  headless: env.parsed?.HEADLESS === "true",
  browser: env.parsed?.BROWSER || "chromium",
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

setDefaultTimeout(60 * 1000 * 4);

// Define the dictionary
const browsers: { [key: string]: BrowserType } = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
};

let browserInstance: Browser | null = null;

/**
 * Initialize the BrowserContext
 * @param selectedBrowser : name of the browser. Supported: chromium, firefox, webkit
 */
async function initBrowserContext(selectedBrowser: string): Promise<Browser> {
  const launchBrowser = browsers[selectedBrowser];
  if (!launchBrowser) {
    throw new Error(`Invalid browser selected: ${selectedBrowser}`);
  }
  return await launchBrowser.launch({ headless: config.headless });
}

/**
 * Initalize the Page
 */
async function initPage(): Promise<void> {
  if (!browserInstance) {
    throw new Error("Browser instance is null");
  }
  pageFixture.context = await browserInstance?.newContext({
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"],
  });
  pageFixture.page = await pageFixture.context.newPage();
  await pageFixture.page.setViewportSize({
    width: config.width,
    height: config.height,
  });
}

/**
 * Close the browser
 */
async function closeBrowser(): Promise<void> {
  if (!browserInstance) {
    console.log("Browser instance is null, so maybe it is already closed");
  } else {
    await browserInstance.close();
  }
}

//BeforeAll: Run once before all scenarios
BeforeAll(async function () {
  console.log("Executing test suite...");
});

//AfterAll: Run once after all scenarios
AfterAll(async function () {
  console.log("Finishing test suite...");
});

//Before: Run before each scenario
Before(async function () {
  try {
    browserInstance = await initBrowserContext(config.browser);
    console.log(`Browser context initialized for: ${config.browser}`);
    await initPage();
  } catch (error) {
    console.error("Browser context initialization failed: ", error);
  }
});

//After: Run after each scenario
After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    // attach the screenshot
    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${
        pickle.name
      }-${Date.now()}.png`;
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
        //timeout: 60000
      });
      this.attach(image, "image/png");
    } else {
      console.error("pageFixture.page is undefined! Please check");
    }
  }
  if (browserInstance) {
    await pageFixture.page.close();
    await pageFixture.context.close();
    await closeBrowser();
  }
});
