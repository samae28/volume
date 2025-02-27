import { Page, Locator } from '@playwright/test'

export class TicketDetailPage {
    private readonly page: Page;
    private readonly festival: Locator;
    
    private readonly onetime: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async clickBuyTicket(ticketType: 'Free' | 'Purchase' | 'Donate' | 'Discounted') {
        await this.page.locator('text=Buy Now').filter({hasText: ticketType}).click()
    }

    

}