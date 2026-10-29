import { test, expect } from './fixtures/test-fixtures';
import testData from './test-data/phones.json';
import { registerUiHooks } from './hooks/ui-hooks';

registerUiHooks(test);

test(
  testData.flipkart.testName,
  async ({ flipkartPage, phoneTestData }) => {
    const { productName, maxPriceInRupees } = phoneTestData.flipkart;

    await test.step('Search Flipkart for the configured phone', async () => {
      await flipkartPage.searchFor(productName);
    });

    await test.step('Verify the matching phone and its price limit', async () => {
      const product = await flipkartPage.findProduct(productName);
      expect(product.title.toLowerCase()).toContain(productName.toLowerCase());
      expect(product.price).toBeLessThanOrEqual(maxPriceInRupees);
    });
  },
);
