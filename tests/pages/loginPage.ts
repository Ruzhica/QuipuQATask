import { Page, Locator } from '@playwright/test';
import fs from 'fs';

export class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly currentUrl: string;

    private credentials = JSON.parse(fs.readFileSync('../QuipuQATask/tests/fixtures/user.json', 'utf-8'));

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('.login'); 
        this.emailInput = page.locator('#email'); 
        this.passwordInput = page.locator('#passwd'); 
        this.loginButton = page.locator('#SubmitLogin'); 
        this.errorMessage = page.locator('#create_account_error'); 
        this.currentUrl = 'http://www.automationpractice.pl/index.php?controller=authentication&back=my-account'; 
    }

    // Click the Sign In button and verify redirection to the login page
    async navigateToLoginPage() {
        await this.signInButton.click();
        await this.page.waitForURL(this.currentUrl); // Verify that the URL changes to the login page
    }

    // Perform login with provided credentials (using the credentials from the JSON file)
    async login() {
        const { email, password } = this.credentials;
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Get error message in case of failed login
    async getErrorMessage() {
        return await this.errorMessage.innerText();
    }
}
