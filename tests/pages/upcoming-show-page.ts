import { Page, Locator, expect } from '@playwright/test'

export class UpcomingShowPage {
    private readonly page: Page;
    private readonly festival: Locator;
    private readonly onetime: Locator;
    festivalShow: {
        free: Locator;
        purchase: Locator;
        donate: Locator;
        discounted: Locator;
    }
    
    onetimeShow: {
        free: Locator;
        purchase: Locator;
        donate: Locator;
        discounted: Locator;
    }
    

    constructor(page: Page) {
        this.page = page;
        this.onetime = page.locator('div').filter({ hasNot: page.locator('.d-flex.mt-3') })
        this.festival = page.locator('div').filter({ has: page.locator('.d-flex.mt-3') })
        this.onetimeShow = {
            free: page.locator('div').filter({ hasNot: page.locator('.d-flex.mt-3') }).filter({ hasText: 'Free Show' }).first().getByRole('button', {name: 'View Show'}),
            purchase: page.locator('div').filter({ hasText: 'Purchase' }),
            donate: page.locator('div').filter({ hasText: 'Donate' }),
            discounted: page.locator('div').filter({ hasText: 'Discounted' }),
        }
    }


    // async clickShow(showType: 'one-time' | 'festival', ticketType: 'Free Show' | 'Purchase' | 'Donate' | 'Discounted') {
    //     const showFilter = showType === 'festival' ? this.festival : this.onetime;
    
    //     let ticketFilter;
    //     if (ticketType === 'Purchase') {
    //         ticketFilter = showFilter
    //             .filter({ hasNotText: 'Free Show' })
    //             .filter({ hasNotText: 'Donate' })
    //             .filter({ hasNotText: 'Discounted' })
    //             .getByRole('button', { name: 'View Show' });
    //     } else {
    //         ticketFilter = showFilter
    //             .filter({ hasText: ticketType })
    //             .getByRole('button', { name: 'View Show' });
    //     }
    
    //     // await expect(ticketFilter).toHaveCount(1); // Ensure at least one match
    //     await ticketFilter.click();
    // }
    
    async clickFreeShow(){
        await this.onetimeShow.free.click();
    }

}