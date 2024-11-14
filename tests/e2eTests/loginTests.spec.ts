import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Scenarios on Automation Practice', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/'); // Navigate to the homepage
    });

    test('User should be redirected to login page when clicking Sign In button', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        expect(page.url()).toBe(loginPage.currentUrl);
    });

    test('Login with valid credentials should succeed', async ({ page }) => {
         // Navigate to the login page
    await loginPage.navigateToLoginPage();
    // Perform login with valid credentials (from the JSON file)
    await loginPage.login();
    // Get the username from the credentials JSON file
    const expectedUsername = loginPage.credentials.username;
    // Verify successful login by checking if the account name is displayed
    const loggedInUser = await page.locator('.account').innerText();
    // Assert that the logged-in user's name contains the expected username
    expect(loggedInUser).toContain(expectedUsername);
    });

    test('Login with invalid credentials should show error message', async ({ page }) => {
        // Navigate to the login page
        await loginPage.navigateToLoginPage();
        
        // Perform login with invalid credentials
        await loginPage.emailInput.fill('invalid_email@example.com');
        await loginPage.passwordInput.fill('invalid_password');
        await loginPage.loginButton.click();
        
        // Verify that the error message appears
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Authentication failed');
    });
});
