// HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultTitle: Locator;

    // Selectors could be defined also in JSON file, but i would go with this approach
    // in my opinion is easier for maintenance, as all elements that we see on the web page are refleted on the page
    // where can be found all functions.
    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_query_top'); 
        this.searchButton = page.locator('.button-search'); 
        this.searchResultTitle = page.locator('.product_list .product-name');
    }

    // Enter a search query into the search input field
    async enterSearchQuery(query: string) {
        await this.searchInput.fill(query);
    }

    // Submit the search query
    async submitSearch() {
        await this.searchButton.click();
    }

    // Get the number of search results displayed
    async getSearchResultCount() {
        const results = await this.page.locator('.product_list .product-name');
        return await results.count();
    }

    // Get the text of the first product in the search results
    async getFirstProductName() {
        return await this.searchResultTitle.first().innerText();
    }

    // Verify that a "No results" message appears when no search result is found
    async getNoResultsMessage() {
        return await this.page.locator('.alert-warning').innerText();
    }
}
