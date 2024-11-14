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
        const searchQuery = 'dress'; 
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBeGreaterThan(0);
        
        // Verify that the first product in the search results matches the query
        const firstProduct = await homePage.getFirstProductName();
        expect(firstProduct.toLowerCase()).toContain(searchQuery.toLowerCase());
    });

    test('Should show no results message for an invalid product', async () => {
        const searchQuery = 'nonexistentproduct'; 
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that no results are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBe(0); // No results should be found
        
        // Verify that the "no results" message is displayed
        const noResultsMessage = await homePage.getNoResultsMessage();
        expect(noResultsMessage).toContain('No results were found for your search');
    });

    test('Should handle empty search query', async () => {
        const searchQuery = ''; 
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that no results are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBe(0); // No results should be found
        
        // Verify that no results message is displayed
        const noResultsMessage = await homePage.getNoResultsMessage();
        expect(noResultsMessage).toContain('Please enter a search keyword');
    });

    test('Should display search results for partial matches', async () => {
        const searchQuery = 'dress'; 
        
        // Enter search query and submit
        await homePage.enterSearchQuery(searchQuery);
        await homePage.submitSearch();
        
        // Verify that results containing 'dress' are displayed
        const resultCount = await homePage.getSearchResultCount();
        expect(resultCount).toBeGreaterThan(0); // Expect at least one result
        
        const firstProduct = await homePage.getFirstProductName();
        expect(firstProduct.toLowerCase()).toContain(searchQuery.toLowerCase()); 
    });

    test('should redirect to the search results page with the correct URL when search button is clicked with an empty query', async ({ page }) => {
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
    
        await homePage.submitSearch();
        await searchPage.expectCorrectRedirection();
    });

});