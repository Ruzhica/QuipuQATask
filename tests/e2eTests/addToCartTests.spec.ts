import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

test.describe('Add to Cart Scenarios', () => {
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        await page.goto('/');
    });

    test('User can add a product to the cart', async ({ page }) => {
        await cartPage.addItemToCart();
        await page.locator('.cart_navigation').click(); // go to checkout
        const checkoutButton = await page.locator('.standard-checkout');
        expect(checkoutButton).toBeVisible();
    });

    test('Proceed to checkout button is visible after adding product to the cart', async ({ page }) => {
        await cartPage.addItemToCart();
        const checkoutButton = await cartPage.proceedToCheckoutButton;
        expect(checkoutButton).toBeVisible();
    });
});
