import { expect } from '@playwright/test';
import { test } from '../config/page-setup';

// test.only('', async ({ page, qaURL, pageHandler }) => {
//     await pageHandler.gotoUpcomingShow()
//     // await (await pageHandler.upcomingShow()).clickShow('one-time', 'Free Show')
//     const upcomingShowPage = await pageHandler.upcomingShow();
//     await upcomingShowPage.clickShow('one-time', 'Free Show');
// })


test.describe.only('', () => {  // ✅ Remove async from describe
    test('', async ({ page, qaURL, pageHandler }) => {
        await pageHandler.gotoUpcomingShow();
        
        const upcomingShowPage = await pageHandler.upcomingShow(); // ✅ Await the page object
        await upcomingShowPage.clickFreeShow(); // ✅ Click Free Show
    });
});

