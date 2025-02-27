import { expect } from '@playwright/test';
import { test } from '../config/page-setup';

test.describe.only('', () => {
    test.only('Free show', async ({ page, qaURL, pageHandler }) => {
        await pageHandler.gotoUpcomingShow()
        await (await pageHandler.upcomingShow()).clickShow('one-time', 'Free Show');  
        await page.waitForTimeout(5000)
        await (await pageHandler.ticketDetail()).clickBuyTicket('Claim Free Show');
    })

    test('Purchase', async ({ page, qaURL, pageHandler }) => {
        await pageHandler.gotoUpcomingShow()
        await (await pageHandler.upcomingShow()).clickShow('one-time', 'Purchase');
        await expect(page).toHaveURL(/\/t\/.*/);
    
    })

    test.describe('claim or donate', () => {
        test('Free', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow('one-time', 'Donate');
            await expect(page).toHaveURL(/\/t\/.*/);
        })

        test('Donate', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow('one-time', 'Donate');
            await expect(page).toHaveURL(/\/t\/.*/);
        })
    })

    // test.only('', async ({ page, qaURL, pageHandler }) => {
    //     await pageHandler.gotoUpcomingShow()
    //     await (await pageHandler.upcomingShow()).clickShow('one-time', 'Discounted');
    //     await expect(page).toHaveURL(/\/t\/.*/);
    
    // })
});

