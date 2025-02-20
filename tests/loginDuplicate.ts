import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigation';
import { LoginForm } from '../pages/login-page';

test.setTimeout(0)
test.beforeEach(async ({page}) => {
    await page.goto('https://volume.com/')
    const navigation = new NavigationPage(page)
    await navigation.loginPage()
})

test('Login with correct credentials and test keepmeloggedin feature', async ({page }) => {
    const login = new LoginForm(page)
    await login.login('akira666molarns', 'centurytuna', false)
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', {timeout: 50000})
})

test('Remember me functionality', async ({page, context, browser }) => {
    // await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name: 'username'}).fill('akira666molarns')
    await page.getByRole('textbox', {name: 'password'}).fill('centurytuna')
    await page.getByText('Keep me logged in').click()
    await page.getByRole('button', { name: 'Sign In' }).click()
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', {timeout: 20000})
    await page.waitForTimeout(3000)

    await context.storageState({ path: 'auth.json' });
    await context.close();

    context = await browser.newContext({ storageState: 'auth.json' });
    page = await context.newPage();

    await page.goto('https://volume.com/');
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns')
})

test('Login with incorrect username', async ({page }) => {
    const errorbox = page.locator('.alert-danger')

    // await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name: 'username'}).fill('akira666molarn')
    await page.getByRole('textbox', {name: 'password'}).fill('centurytuna')
    await page.getByText('Keep me logged in').click()
    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.waitForLoadState('networkidle')
    await expect(errorbox).toHaveText('Please enter a correct username and password. Note that both fields may be case-sensitive.') 
})

test('Login with incorrect password', async ({page }) => {
    const errorbox = page.locator('.alert-danger')

    // await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name: 'username'}).fill('akira666molarns')
    await page.getByRole('textbox', {name: 'password'}).fill('centurytunas')
    await page.getByText('Keep me logged in').click()
    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.waitForLoadState('networkidle')
    await expect(errorbox).toHaveText('Please enter a correct username and password. Note that both fields may be case-sensitive.') 
})

test('Login with empty username', async ({ page }) => {
    // await page.getByText('Sign in').click();
    const usernameInput = page.getByRole('textbox', { name: 'username' });
    await page.getByRole('textbox', { name: 'password' }).fill('centurytunas');
    await page.getByText('Keep me logged in').click();
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForLoadState('networkidle')
    
    const validationMessage: string = await usernameInput.evaluate((input: HTMLInputElement) => input.validationMessage);

    
    expect(validationMessage).toBe('Please fill out this field.');
});

test('Login with empty password', async ({ page }) => {
    // await page.getByText('Sign in').click();
    await page.getByRole('textbox', { name: 'username' }).fill('akira666molarns');
    const passwordInput = page.getByRole('textbox', { name: 'password' });
    await page.getByText('Keep me logged in').click();
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForLoadState('networkidle')
    
    const validationMessage: string = await passwordInput.evaluate((input: HTMLInputElement) => input.validationMessage);

    expect(validationMessage).toBe('Please fill out this field.');
});

test('Login with empty password and empty username', async ({ page }) => {
    // await page.getByText('Sign in').click();

    const usernameInput = page.getByRole('textbox', { name: 'username' })
    const passwordInput = page.getByRole('textbox', { name: 'password' })


    await page.getByText('Keep me logged in').click();
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForLoadState('networkidle')
    
    const validationMessagePassword: string = await passwordInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    const validationMessageUsername: string = await usernameInput.evaluate((input: HTMLInputElement) => input.validationMessage);
 
    expect(validationMessagePassword).toBe('Please fill out this field.');
    expect(validationMessageUsername).toBe('Please fill out this field.');
});

