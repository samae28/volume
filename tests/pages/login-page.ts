import { Page, BrowserContext, Browser } from '@playwright/test';

export class LoginPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
    
    async login(username: string, password: string, keepMeLoggedIn: boolean = false) {
        
        await this.page.getByText('Login').click()
        await this.page.getByRole('textbox', { name: 'username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'password' }).fill(password);

        if (keepMeLoggedIn) {
            await this.page.getByText('Keep me logged in').click({ force: true });
        }

        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async saveAuthState(filePath: string = 'auth.json') {
        await this.page.context().storageState({ path: filePath });
    }

    async openNewSessionWithAuth(url: string, filePath: string = 'auth.json'): Promise<Page> {
        const browser: Browser | null = this.page.context().browser();
        if (!browser) throw new Error("Browser instance is not available.");

        const newContext: BrowserContext = await browser.newContext({ storageState: filePath });
        const newPage: Page = await newContext.newPage();
        await newPage.goto(url);

        return newPage;
    }

    async loginAndPersistSession(username: string, password: string, keepMeLoggedIn: boolean, redirectUrl: string) {
        await this.login(username, password, keepMeLoggedIn);
        await this.saveAuthState();
        return await this.openNewSessionWithAuth(redirectUrl);
    }

    async emptyValidationMessage(): Promise<{ username: string; password: string }> {
        const [usernameMessage, passwordMessage] = await Promise.all([
            this.page.getByRole('textbox', { name: 'username' }).evaluate((input: HTMLInputElement) => input.validationMessage),
            this.page.getByRole('textbox', { name: 'password' }).evaluate((input: HTMLInputElement) => input.validationMessage),
        ]);
    
        return { username: usernameMessage, password: passwordMessage };
    }

    async errorMessage(): Promise<string> {
        const errorBox = this.page.locator('.alert-danger');  
        await errorBox.waitFor(); // Ensure the element is present before extracting text
        return await errorBox.innerText(); // Extract and return the actual error message
    }
    
    
   
}   