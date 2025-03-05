import { Page, FrameLocator, expect } from '@playwright/test'

// export const CardDetails = {
//     cardNumber: '4242 4242 4242 4242',
//     expiry: '02/42',
//     CVC: '424', 
// }

export class ProductCheckoutPage {
    private readonly page: Page;
    private readonly cardNumberFrame: FrameLocator;
    private readonly expiryFrame: FrameLocator;
    private readonly cvcFrame: FrameLocator;
    private readonly saveWithLinkFrame: FrameLocator;  
    
    constructor(page: Page) {
        this.page = page;
        this.cardNumberFrame = this.page.frameLocator('iframe').nth(0);
        this.expiryFrame = this.page.frameLocator('iframe').nth(1);
        this.cvcFrame = this.page.frameLocator('iframe').nth(2);
        this.saveWithLinkFrame = this.page.frameLocator('iframe').nth(3); 

    }

    async pay(cardNumber: string, expiry: string, cvc: string) {

        await this.cardNumberFrame.locator('input[name="cardnumber"]').fill(cardNumber);
        await this.expiryFrame.locator('input[name="exp-date"]').fill(expiry);
        await this.cvcFrame.locator('input[name="cvc"]').fill(cvc);

        const saveWithLinkCheckbox = this.saveWithLinkFrame.locator('.ButtonContainer--save');
        if (await saveWithLinkCheckbox.isVisible()) {
            await saveWithLinkCheckbox.click({force: true});
        }
        await this.page.waitForTimeout(10000)
        const payButton = this.page.getByRole('button', { name: 'Pay Now' });
        await payButton.click();
        await this.page.waitForTimeout(10000)

    }
}