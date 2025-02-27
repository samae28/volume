import { Page, Locator, expect } from '@playwright/test'

export class TicketDetailPage {
    private readonly page: Page;
    private readonly button: Locator

    constructor(page: Page) {
        this.page = page;
        this.button = page.getByRole('button').filter({ has: this.page.locator('.btn.btn-lg.btn-primary.w-100')})
    }

    async clickBuyTicket(buttonType: 'Claim Free Show' | 'Buy Ticket:' | 'Donate and Claim' | 'Discounted') {
        const buttonFilter =
            buttonType.startsWith('Buy Ticket:') ? 'Buy Ticket:' :
            ['Claim Free Show', 'Donate and Claim', 'Discounted'].includes(buttonType) ? buttonType :
            null;

        if (!buttonFilter) {
            throw new Error(`Invalid button type: ${buttonType}`);
        }

        const filteredButton = this.button.filter({ hasText: buttonFilter });
        await filteredButton.click();
    }
}