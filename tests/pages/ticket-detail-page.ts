import { Page, Locator, expect } from '@playwright/test'
import { ButtonType } from 'tests/utils/utils';

// export enum ButtonType {
//     Free = 'Claim Free Ticket',
//     Buy = 'Buy Ticket:',
//     Donate = 'Donate and Claim',
//     Discounted = 'Discounted',
//     ViewButton = 'View Ticket'
// }

export class TicketDetailPage {
    private readonly page: Page;
    private readonly buttonLocator: Locator

    constructor(page: Page) {
        this.page = page;
        this.buttonLocator = page.locator('.justify-content-center.d-none.d-sm-flex.w-100').getByRole('button');
    }

    async getTicket(buttonType: ButtonType, price?: number) {
        let buttonText: string = buttonType; 
        
        if ((buttonType === ButtonType.Buy || buttonType === ButtonType.Discounted) && price !== undefined) {
            const Price = price.toFixed(2);  
            buttonText = `${buttonType} $${Price}`;
            const button = this.page.getByRole('button', { name: buttonText });
            await button.click();
            await expect(this.page).toHaveURL(/\/products\/checkout\/select_paymethod\/[a-f0-9-]+\/\?fl=\w+/);
        } else if (buttonType === ButtonType.Donate) {
            const button = this.buttonLocator.filter({ hasText: buttonText });

            await button.click();
            await this.page.waitForSelector('#ticketDonateModal', { state: 'visible' });
            
            await this.page.getByRole('spinbutton', { name: 'Donation USD Amount' }).fill('10');
            await this.page.getByRole('button', { name: 'Donate Now' }).click();
        
            await expect(this.page).toHaveURL(/\/products\/checkout\/select_paymethod\/[a-f0-9-]+\/\?fl=\w+/);
            await this.page.waitForTimeout(1000)
        }
         else {
            const button = this.buttonLocator.filter({ hasText: buttonText });
            await button.click();
            await expect(this.page).toHaveURL(/\/scheduled_show\/ticket_confirmation\/.*/);
        }
    }
}