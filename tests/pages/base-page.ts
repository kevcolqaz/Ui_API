import type { Page } from '@playwright/test';

export class BasePage {
  private readonly baseUrl: string;

  constructor(
    protected readonly page: Page,
    baseUrl: string,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async open(path = '/'): Promise<void> {
    await this.page.goto(new URL(path, `${this.baseUrl}/`).toString());
  }

  parseRupeePrice(text: string): number {
    const match = text.match(/₹\s*([\d,]+(?:\.\d{1,2})?)/);
    if (!match) {
      throw new Error(`Could not read a rupee price from: "${text}"`);
    }

    const price = Number(match[1].replace(/,/g, ''));
    if (!Number.isFinite(price)) {
      throw new Error(`Invalid rupee price: "${match[1]}"`);
    }
    return price;
  }
}
