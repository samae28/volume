import { Page, Locator, expect } from '@playwright/test'
import { ButtonType } from 'tests/utils/utils';

export class TicketDetailPage {
    private readonly page: Page;
    private readonly buttonLocator: Locator;
    private readonly festivalShowButtonLocator: Locator;
    private readonly festivalCard: Locator;
    private readonly discounted: Locator;
    private readonly fullPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonLocator = page.locator('.justify-content-center.d-none.d-sm-flex.w-100').getByRole('button');
        this.festivalShowButtonLocator = page.locator('#buy-btn')     
        this.festivalCard = page.locator('#select-entire-festival')
        this.discounted = this.festivalCard.filter({ has: this.page.locator('.fs-xs.m-0.ms-auto.text-decoration-line-through.text-gray-700')})
        this.fullPrice = this.festivalCard.filter({ hasNot: this.page.locator('.fs-xs.m-0.ms-auto.text-decoration-line-through.text-gray-700')})

    }

    async getTicket(buttonType: ButtonType, price?: number) {
        let buttonText: string = buttonType; 
        
        if (buttonType === ButtonType.Buy && price !== undefined){
            if (await this.fullPrice.isVisible()){
                await this.fullPrice.click()
                await this.page.waitForTimeout(10000)
                const Price = price.toFixed(2);  
                buttonText = `${buttonType} $${Price}`;
                const button = this.page.getByRole('button', { name: buttonText });
                await button.click();
            } else if (await this.discounted.isVisible()){
                await this.discounted.click()
                await this.page.waitForTimeout(10000)
                const Price = price.toFixed(2);  
                buttonText = `${buttonType} $${Price}`;
                const button = this.page.getByRole('button', { name: buttonText });
                await button.click();
            } else {
            
                const Price = price.toFixed(2);  
                buttonText = `${buttonType} $${Price}`;
                const button = this.page.getByRole('button', { name: buttonText });
                await button.click();
            }
            
        } else if (buttonType === ButtonType.Donate) {
            const button = this.buttonLocator.filter({ hasText: buttonText });

            await button.click();
            await this.page.waitForSelector('#ticketDonateModal', { state: 'visible' });
            
            await this.page.getByRole('spinbutton', { name: 'Donation USD Amount' }).fill('10');
            await this.page.getByRole('button', { name: 'Donate Now' }).click();
    
            await this.page.waitForTimeout(1000)
        } else {
            const button = this.buttonLocator.filter({ hasText: buttonText });
            await button.click();
        }
    }

}