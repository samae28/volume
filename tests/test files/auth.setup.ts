import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://volume.com/account/login/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('textbox', { name: 'Enter your Email or Username' }).fill('akira666molarns');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('centurytuna');

  await page.getByRole('button', { name: 'Continue with password' }).click();
    await page.waitForTimeout(3000)

    await expect(page.locator('#navbarDropdown')).toBeVisible({ timeout: 5000 });
    await page.waitForSelector('#navbarDropdown', { timeout: 5000 });
    await expect(page.locator('#navbarDropdown')).toHaveText('akira666molarns', { timeout: 5000 });

    await page.waitForTimeout(1000); 
  await page.context().storageState({ path: authFile });
});