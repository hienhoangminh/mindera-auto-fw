import { BrowserContext, Page } from "@playwright/test";

export const pageFixture = {
  page: undefined as unknown as Page,
  context: undefined as unknown as BrowserContext,
};
