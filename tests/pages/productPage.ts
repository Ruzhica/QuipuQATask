import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('button[name="Submit"]');
      }


  async addToCart() {
    await this.addToCartButton.click;
  }
}
