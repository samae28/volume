import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://volume.com/auth/login/', { waitUntil: 'domcontentloaded' });


    // await page.getByText('Login').click();

    await page.getByRole('textbox', { name: 'username' }).fill('akira666molarns');
    await page.getByRole('textbox', { name: 'password' }).fill('centurytuna');

    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(3000)

    await expect(page.locator('#navbarDropdown')).toBeVisible({ timeout: 50000 });
    await page.waitForSelector('#navbarDropdown', { timeout: 50000 });
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', { timeout: 50000 });

    await page.waitForTimeout(1000); 
  await page.context().storageState({ path: authFile });
});
