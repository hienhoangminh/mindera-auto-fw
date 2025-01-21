import { Page, Locator, expect } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

import { config as loadEnv } from "dotenv";

const env = loadEnv({ path: "./env/.env" });
const config = {
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

export class BasePage {
  /**
   * Get the Page instance from pageFixture.page
   */
  get page(): Page {
    return pageFixture.page;
  }

  /**
   * Navigate to the specific URL
   * @param url: the URL in string
   */
  public async navigate(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 15000 });
  }

  /**
   * Wait for element with role and text before clicking
   * @param role: the role
   * @param name: the text of the element
   * @param exact: is the text of element strict: case-sensitive and whole string
   */
  public async waitAndClickByRole(
    role: string,
    name: string,
    exact: boolean = false
  ): Promise<void> {
    let el = this.page.getByRole(role as any, { name: name, exact: exact });
    await el.waitFor();
    await el.click();
  }

  /**
   * Wait for element by locator before clicking
   * @param locator: the Locator object
   */
  protected async waitAndClick(locator: Locator): Promise<void> {
    await locator.isVisible();
    await locator.click();
  }

  /**
   * Wait for element with selector before clicking
   * @param selector: the css/xpath selector
   */
  public async waitAndClickBySelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  /**
   * Switch to new tab
   */
  public async switchToNewTab(): Promise<void> {
    await this.page.context().waitForEvent("page");

    //Retrieve all current opened pages(tabs)
    const allPages = this.page.context().pages();

    // Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    // Bring the new assigned page to the front
    await this.page.bringToFront();

    // Set the view port for the page in front
    await this.page.setViewportSize({
      width: config.width,
      height: config.height,
    });
  }

  /**
   * Wait for element by placeholder text and fill value
   * @param placeHolderTxt: the value of placeholder attribute
   * @param value: the text that we want to input
   */
  public async waitAndFillTextByPlaceholder(
    placeHolderTxt: string,
    value: string
  ): Promise<void> {
    await this.page.getByPlaceholder(placeHolderTxt).fill(value);
  }

  /**
   * Wait for element by placeholder text and fill value
   * @param selector: the css/xpath selector
   * @param value: the text that we want to input
   */
  public async waitAndFillTextBySelector(
    selector: string,
    value: string
  ): Promise<void> {
    let el = await this.page.waitForSelector(selector);
    await el.fill(value);
  }

  /**
   * Wait for element by selector string then hover on it
   * @param selector: the css/xpath selector
   */
  public async waitAndHoverOnElement(selector: string): Promise<void> {
    let el = await this.page.waitForSelector(selector, { state: "visible" });
    await el.hover();
  }

  /**
   * Wait for element by selector string then hover on it
   * @param selector: the css/xpath selector
   */
  public async waitAndHoverOnElementByRole(
    role: any,
    value: string,
    exact: boolean = false
  ): Promise<void> {
    let el = this.page.getByRole(role, { name: value, exact: exact });
    await el.hover();
  }

  /**
   * Select option from select dropdown
   * @param selector: the css/xpath selector of the select dropdown
   * @param option: the value of option
   */
  public async selectOption(selector: string, option: string): Promise<void> {
    await this.page.selectOption(selector, { value: option });
  }

  /**
   * Get the page title
   * @returns the title
   */
  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verify if page title is correct
   * @param title : the title of the page
   */
  public async verifyIfPageTitleCorrect(title: string): Promise<void> {
    expect(await this.getPageTitle()).toEqual(title);
  }

  /**
   * Get the text content of element with selector
   * @param selector : the css/xpath selector
   * @returns the text
   */
  public async getTextContentOfElement(selector: string): Promise<string> {
    let el = await this.page.waitForSelector(selector, { state: "visible" });
    return el.innerText();
  }

  /**
   * Wait for load state
   */
  public async waitForLoadState() {
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  }

  /**
   * Wait for element to be shown and extract attribute value
   * @param selector the css/xpath selector
   * @param attrName
   * @returns
   */
  public async waitAndExtractAttributeValue(
    selector: string,
    attrName: string
  ) {
    let el = await this.page.waitForSelector(selector);
    return await el.getAttribute(attrName);
  }

  /**
   * Wait for fixed time
   * @param timeout the timeout number
   */
  public async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout * 1000);
  }

  /**
   * Get element by text
   * @param text the string
   */
  public async getElementByText(text: string) {
    return this.page.getByText(text);
  }

  public async getElementByLocator(selector: string) {
    return this.page.locator(selector);
  }
}
