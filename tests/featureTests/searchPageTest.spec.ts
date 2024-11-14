import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';

test.describe('Search Feature from search page', () => {
    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.navigate();
    });

    test('Search for an existing product', async () => {
        await searchPage.searchForItem('dress');
        await searchPage.expectCorrectRedirection(); 
        await expect(searchPage.searchResultHeading).toContainText('result');
        await expect(searchPage.searchResultItem).toBeVisible();
    });

    test('Search for a non-existing product', async () => {
        await searchPage.searchForItem('nonexistentproduct');
        await searchPage.expectCorrectRedirection(); 
        await expect(searchPage.noResultsMessage).toBeVisible();
        await expect(searchPage.noResultsMessage).toHaveText('No results were found for your search');
    });

    test('Search with an empty query', async () => {
        await searchPage.searchForItem('');
        await expect(searchPage.noResultsMessage).toBeVisible();
        await expect(searchPage.noResultsMessage).toHaveText('Please enter a search keyword');
    });
});
