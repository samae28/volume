import { expect } from '@playwright/test';
import { PageHandler  } from '../../../pages/pages'
import { errorMessages } from '../../../config/err-msg'
import { test } from '../../../config/page-setup';

test.setTimeout(0)
// test.beforeEach(async ({page, qaURL}) => {
//     await page.goto(qaURL)
//     const pages = new Pages(page)
//     await pages.navigation().loginPage()
// })

test('Login with correct credentials and test keepmeloggedin feature', async ({ page, qaURL, pageHandler }) => {
    await pageHandler.login().loginAndPersistSession('akira666molarns', 'centurytuna', false, qaURL)
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', {timeout: 50000})
})

test('Login with incorrect username', async ({ qaURL, pageHandler }) => {
    await pageHandler.login().login('akira666molarn', 'centurytuna', false)
    
    expect(await pageHandler.login().errorMessage()).toBe(errorMessages.login.INVALID_USERNAME);
})

test('Login with incorrect password', async ({ page, qaURL, pageHandler }) => {
    await pageHandler.login().login('akira666molarns', 'centurytun', false)
    expect(await pageHandler.login().errorMessage()).toBe(errorMessages.login.INVALID_PASSWORD);

})

test('Login with empty username', async ({ page, qaURL, pageHandler }) => {
    await pageHandler.login().login('', 'centurytuna', false)
    expect((await pageHandler.login().emptyValidationMessage()).username).toBe(errorMessages.login.EMPTY_USERNAME);
});

test('Login with empty password', async ({ page, qaURL, pageHandler }) => {
    await pageHandler.login().login('akira666molarns', '', false)
    expect((await pageHandler.login().emptyValidationMessage()).password).toBe(errorMessages.login.EMPTY_PASSWORD);

});

test('Login with empty password and empty username', async ({ page, qaURL, pageHandler }) => {
    await pageHandler.login().login('', '', false)
    expect((await pageHandler.login().emptyValidationMessage()).username).toBe(errorMessages.login.EMPTY_USERNAME);
    expect((await pageHandler.login().emptyValidationMessage()).password).toBe(errorMessages.login.EMPTY_PASSWORD);
});

