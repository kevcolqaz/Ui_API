import { test as base, expect } from '@playwright/test';
import phoneTestData from '../test-data/phones.json';
import { FlipkartPage } from '../pages/flipkart-page';

type UiFixtures = {
  flipkartPage: FlipkartPage;
  phoneTestData: typeof phoneTestData;
};

export const test = base.extend<UiFixtures>({
  flipkartPage: async ({ page }, use) => {
    const flipkartPage = new FlipkartPage(page, phoneTestData.flipkart.baseUrl);
    await use(flipkartPage);
  },
  phoneTestData: async ({}, use) => {
    await use(phoneTestData);
  },
});

export { expect };
