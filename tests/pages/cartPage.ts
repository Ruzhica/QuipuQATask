import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('.ajax_add_to_cart_button');
        this.proceedToCheckoutButton = page.locator('.button-medium');
    }

    async addItemToCart() {
        await this.addToCartButton.click();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}
