import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';
import { HomePage } from '../pages/homePage';


test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await page.goto('/'); // Navigate to the homepage
});

test('Search for valid product', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.search('dress');

  // Verify that search results are displayed
  const resultsCount = await searchPage.getSearchResults();
  expect(resultsCount).toBeGreaterThan(0);
});

test('Search for invalid product', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.search('invalidProduct123');

  // Verify that no results are displayed
  const resultsCount = await searchPage.getSearchResults();
  expect(resultsCount).toBe(0);
});
