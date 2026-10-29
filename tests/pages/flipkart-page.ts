import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class FlipkartPage extends BasePage {
  private readonly searchBox: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.searchBox = page.getByRole('textbox', {
      name: 'Search for Products, Brands and More',
    });
  }

  async searchFor(productName: string): Promise<void> {
    await this.open('/');
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  async findProduct(productName: string): Promise<{ title: string; price: number }> {
    const productLinks = this.page.locator('a[href*="/p/"]');
    await productLinks.first().waitFor({ state: 'visible' });
    const matchingProduct = productLinks.filter({ hasText: productName }).first();
    if (!(await matchingProduct.count())) {
      throw new Error(`Flipkart has no visible search result for "${productName}".`);
    }

    const productText = await matchingProduct.innerText();
    const title = productText
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.toLowerCase().includes(productName.toLowerCase()));
    if (!title) {
      throw new Error(`Could not read the product title for "${productName}".`);
    }

    return {
      title,
      price: this.parseRupeePrice(productText),
    };
  }
}
