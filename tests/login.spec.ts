import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.setTimeout(0)
test.beforeEach(async ({page}) => {
    await page.goto('https://volume.com/')
    const pm = new PageManager(page)
    await pm.navigation().loginPage()
})

test('Login with correct credentials and test keepmeloggedin feature', async ({page }) => {
    const pm = new PageManager(page)
    await pm.login().loginAndPersistSession('akira666molarns', 'centurytuna', false, 'https://volume.com/')
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', {timeout: 50000})
})

test('Login with incorrect username', async ({page }) => {
    const errorbox = page.locator('.alert-danger')
    const pm = new PageManager(page)
    await pm.login().login('akira666molarn', 'centurytuna', false)
    await expect(errorbox).toHaveText('Please enter a correct username and password. Note that both fields may be case-sensitive.') 
})

test('Login with incorrect password', async ({page }) => {
    const errorbox = page.locator('.alert-danger')
    const pm = new PageManager(page)
    await pm.login().login('akira666molarns', 'centurytun', false)
    await expect(errorbox).toHaveText('Please enter a correct username and password. Note that both fields may be case-sensitive.') 
})

test('Login with empty username', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.login().login('', 'centurytuna', false)
    await page.waitForLoadState('networkidle');
    const validationMessage = await pm.login().getValidationMessage('username');
    expect(validationMessage).toBe('Please fill out this field.');
});

test('Login with empty password', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.login().login('akira666molarns', '', false)
    await page.waitForLoadState('networkidle');
    const validationMessage = await pm.login().getValidationMessage('password');
    expect(validationMessage).toBe('Please fill out this field.');
});

test('Login with empty password and empty username', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.login().login('', '', false)
    await page.waitForLoadState('networkidle');
    const usernameValidationMessage = await pm.login().getValidationMessage('username');
    expect(usernameValidationMessage).toBe('Please fill out this field.');
    const passwordvalidationMessage = await pm.login().getValidationMessage('password');
    expect(passwordvalidationMessage).toBe('Please fill out this field.');
});

