import { Locator, Page, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultItem: Locator;
    readonly searchResultHeading: Locator;
    readonly noResultsMessage: Locator;
    readonly resultList : Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_query_top');
        this.searchButton = page.locator('button[name="submit_search"]'); 
        this.searchResultItem = page.locator('.product_list .product-container'); 
        this.searchResultHeading = page.locator('.heading-counter'); 
        this.noResultsMessage = page.locator('.alert.alert-warning'); 
        this.resultList = page.locator('.product_list');
    }

    async expectCorrectRedirection() {
        await expect(this.page).toHaveURL('http://www.automationpractice.pl/index.php?controller=search&orderby=position&orderway=desc&search_query=&submit_search=');
     }

    async navigate() {
        await this.page.goto('/');
        }

    async searchForItem(item: string) {
        await this.searchInput.fill(item);
        await this.searchButton.click();
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click(); 
        await this.page.waitForSelector('.product_list');
      }


      async getSearchResults() {
        return await this.resultList.count;
      }

}
