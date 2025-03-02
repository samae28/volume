import { Page, Locator, expect } from '@playwright/test'

export class PaymentPage {
    private readonly page: Page;
    private readonly buttonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonLocator = page.getByRole('button')
    }
    
    async selectPaymentType() {
        //fill up the card
        //click pay button
    }
}