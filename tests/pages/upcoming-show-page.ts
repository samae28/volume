import { Page, Locator, expect } from '@playwright/test'
import { ShowType, TicketType } from 'tests/utils/utils';
// export enum ShowType{
//     OneTime = 'one-time',
//     Festival = 'festival',
// }

// export enum TicketType{
//     Free = 'Free Show',
//     Purchase = 'Purchase',
//     Donate = 'Donate',
//     Discounted = 'Discounted',
//     FreeForSubscribers = 'Free for Subscribers',
// }
export class UpcomingShowPage {
    private readonly page: Page;
    private readonly festival: Locator;
    private readonly onetime: Locator;

    constructor(page: Page) {
        this.page = page;
        this.onetime = page.locator('.col-12.col-lg-6').filter({ hasNot: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
        this.festival = page.locator('.col-12.col-lg-6').filter({ has: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
    }

    async clickShow(showType : ShowType, ticketType : TicketType) {
        const showFilter = showType === ShowType.Festival ? this.festival : this.onetime;
    
        let ticketFilter: Locator;

        if (ticketType === TicketType.Purchase) {
            ticketFilter = showFilter
                // .filter({ hasNotText: 'Free Show' })
                // .filter({ hasNotText: 'Donate' })
                // .filter({ hasNotText: 'Discounted' })
                // .filter({ hasNotText: 'Free for Subscribers' })
                .filter({ hasNot: this.page.locator('.fs-sm.text-gray-600.mt-4')})
                .getByRole('button', { name: 'View Show' }).last();
        } else {
            ticketFilter = showFilter
                .filter({ hasText: ticketType })
                .getByRole('button', { name: 'View Show' }).last();
        }
        
        await ticketFilter.click();
        await expect(this.page).toHaveURL(/\/t\/.*/);
    }

}