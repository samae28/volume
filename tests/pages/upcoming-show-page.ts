import { Page, Locator, expect } from '@playwright/test'
import { ShowType, TicketType } from 'tests/utils/utils';
 
export class UpcomingShowPage {
    private readonly page: Page;
    private readonly festival: Locator;
    private readonly onetime: Locator;

    constructor(page: Page) {
        this.page = page;
        this.onetime = page.locator('.col-12.col-lg-6').filter({ hasNot: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
        this.festival = page.locator('.col-12.col-lg-6').filter({ has: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
    }

    async clickShow(showType : ShowType, ticketType : TicketType, index? : number) {
        const showFilter = showType === ShowType.Festival ? this.festival : this.onetime;
    
        let ticketFilter: Locator;

        if (ticketType === TicketType.Purchase && index !== undefined) {
            ticketFilter = showFilter
                .filter({ hasNot: this.page.locator('.fs-sm.text-gray-600.mt-4')})
                .getByRole('button', { name: 'View Show' }).nth(index);
        } else if (ticketType === TicketType.Donate && index) {
            ticketFilter = showFilter
                .filter({ hasText: ticketType })
                .getByRole('button', { name: 'View Show' }).nth(index);
        } else {
            ticketFilter = showFilter
                .filter({ hasText: ticketType })
                .getByRole('button', { name: 'View Show' }).first();
        }
        
        await ticketFilter.click();
        await expect(this.page).toHaveURL(/\/t\/.*/);
    }

}