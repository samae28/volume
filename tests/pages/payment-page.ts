import { Page, Locator, expect } from '@playwright/test'

export enum PaymentType {
    CreditCard = 'Credit Card',
    PayPal = 'PayPal',
}
export class PaymentPage {
    private readonly page: Page;
    private readonly buttonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonLocator = page.getByRole('button')
    }
    
    async selectPaymentType(type: PaymentType) {
        await this.buttonLocator.filter({ hasText: type }).click();
    }
}