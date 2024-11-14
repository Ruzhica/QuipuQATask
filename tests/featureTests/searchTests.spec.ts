import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';


test.describe('Search Feature on Automation Practice', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto('/'); // Navigate to the homepage
    });

    test('Should display search results for a valid product', async () => {
        const searchQuery = 'dress'; // Valid product name for search
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that the search results are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBeGreaterThan(0); // Expect at least one result
        
        // Verify that the first product in the search results matches the query
        const firstProduct = await homePage.getFirstProductName();
        expect(firstProduct.toLowerCase()).toContain(searchQuery.toLowerCase()); // The product name should contain 'dress'
    });

    test('Should show no results message for an invalid product', async () => {
        const searchQuery = 'nonexistentproduct'; // Invalid product name
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that no results are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBe(0); // No results should be found
        
        // Verify that the "no results" message is displayed
        const noResultsMessage = await homePage.getNoResultsMessage();
        expect(noResultsMessage).toContain('No results were found for your search'); // Expect "No results" message
    });

    test('Should handle empty search query', async () => {
        const searchQuery = ''; // Empty search query
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that no results are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBe(0); // No results should be found
        
        // Verify that no results message is displayed
        const noResultsMessage = await homePage.getNoResultsMessage();
        expect(noResultsMessage).toContain('Please enter a search keyword'); // Expect "Please enter a search keyword" message
    });

    test('Should display search results for partial matches', async () => {
        const searchQuery = 'dress'; // Partial match query
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that results containing 'dress' are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBeGreaterThan(0); // Expect at least one result
        
        const firstProduct = await homePage.getFirstProductName();
        expect(firstProduct.toLowerCase()).toContain(searchQuery.toLowerCase()); // The product name should contain 'dress'
    });

    test('should redirect to the search results page with the correct URL when search button is clicked with an empty query', async ({ page }) => {
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
    
        await homePage.submitSearch();
        await searchPage.expectCorrectRedirection();
    });

});