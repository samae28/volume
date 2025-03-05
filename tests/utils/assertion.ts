import { expect, Page } from "@playwright/test";

export class Assertions{
    constructor(private page: Page){
        this.page = page;
    }

    async assertUpcomingPageLoaded() {
        await expect(this.page).toHaveURL(/\/scheduled_show\/upcoming\/.*/);
        await expect(this.page.locator('h1')).toHaveText('Upcoming Shows');
    }

    async assertTicketDetailPageLoaded() {
        await expect(this.page).toHaveURL(/\/t\/[A-Za-z0-9]+\/?.*/);
    }

    async assertTicketConfirmationPageLoaded() {
         await expect(this.page).toHaveURL(/\/scheduled_show\/ticket_confirmation\/.*/);
    }

    async assertSelecPaymentMethodPageLoaded() {
        await expect(this.page).toHaveURL(/\/products\/checkout\/select_paymethod\/[a-f0-9-]+\/?\?fl=[A-Za-z0-9]+/);
    }

    async assertProductCheckoutPageLoaded() {
        await expect(this.page).toHaveURL(/\/products\/checkout\/[a-f0-9-]+\/?\?fl=[A-Za-z0-9]+/);
    }

    async assertLivePageLoaded() {
        await expect(this.page).toHaveURL(/\/[^/]+\/.*/);
    }
}