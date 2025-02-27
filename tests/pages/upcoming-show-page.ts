import { Page, Locator, expect } from '@playwright/test'

enum showType{
    oneTime = 'one-time',
    festival = 'festival',
}

enum ticketType{
    free = 'Free Show',
    purchase = 'Purchase',
    donate = 'Donate',
    discounted = 'Discounted',
}
export class UpcomingShowPage {
    private readonly page: Page;
    private readonly festival: Locator;
    private readonly onetime: Locator;

    constructor(page: Page) {
        this.page = page;
        this.onetime = page.locator('div').filter({ hasNot: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
        this.festival = page.locator('div').filter({ has: this.page.locator('.d-grid.ps-2.ps-sm-5.w-100') })
    }

    async clickShow(showType, ticketType) {
        const showFilter = showType === 'festival' ? this.festival : this.onetime;
    
        let ticketFilter;

        if (ticketType === 'Purchase') {
            ticketFilter = showFilter
                .filter({ hasNotText: 'Free Show' })
                .filter({ hasNotText: 'Donate' })
                .filter({ hasNotText: 'Discounted' })
                .filter({ hasNot: this.page.locator('.fs-sm.text-gray-600.mt-4')})
                .getByRole('button', { name: 'View Show' });
        } else {
            ticketFilter = showFilter
                .filter({ hasText: ticketType })
                .getByRole('button', { name: 'View Show' });
        }
    
        await ticketFilter.first().click();
        await expect(this.page).toHaveURL(/\/t\/.*/);
    }

}