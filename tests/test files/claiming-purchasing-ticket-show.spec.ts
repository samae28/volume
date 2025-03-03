// import { expect } from '@playwright/test';
import { test } from '../config/page-setup';
import { ShowType, TicketType, ButtonType, PaymentType, CardDetails } from 'tests/utils/utils';



test.describe('One Time Show', () => {
    test.describe('When Show Ticket is not claimed/purchased and show is not live', () => {
        test('Claim Free - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Free);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Free);
        })

        test.only('Purchase - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Purchase);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Buy, 5);
            await (await pageHandler.payment()).selectPaymentType(PaymentType.CreditCard);
            await (await pageHandler.productCheckout()).pay(CardDetails.cardNumber, CardDetails.expiry, CardDetails.CVC);
        })

        test.describe('Donate - not live', async() => {
            test('Claim - not live', async ({ page, qaURL, pageHandler }) => {
                await pageHandler.gotoUpcomingShow()
        
                await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
        
                await (await pageHandler.ticketDetail()).getTicket(ButtonType.Free);
            })
            test('Donate and claim - not live', async ({ page, qaURL, pageHandler }) => {
                await pageHandler.gotoUpcomingShow()
        
                await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
        
                await (await pageHandler.ticketDetail()).getTicket(ButtonType.Donate);
            })
        })

        
        test('Discounted - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Free);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Discounted);
        })
    })


    test('Purchasee', async ({ page, qaURL, pageHandler }) => {
        await pageHandler.gotoUpcomingShow()
        await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Purchase);
        // await expect(page).toHaveURL(/\/t\/.*/);
    
    })

    test.describe('claim or donate', () => {
        test('Free', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
            // await expect(page).toHaveURL(/\/t\/.*/);
        })

        test('Donate', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
            // await expect(page).toHaveURL(/\/t\/.*/);
        })
    })

    // test.only('', async ({ page, qaURL, pageHandler }) => {
    //     await pageHandler.gotoUpcomingShow()
    //     await (await pageHandler.upcomingShow()).clickShow('one-time', 'Discounted');
    //     await expect(page).toHaveURL(/\/t\/.*/);
    
    // })
});

test.describe('Festival Show', () => {
    test.describe('When Show Ticket is not claimed/purchased and show is not live', () => {
        test('Claim Free - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.Festival, TicketType.Free);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Free);
        })

        test('Purchase - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Purchase);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Buy, 5);
        })

        test.describe('Donate - not live', async() => {
            test('Claim - not live', async ({ page, qaURL, pageHandler }) => {
                await pageHandler.gotoUpcomingShow()
        
                await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
        
                await (await pageHandler.ticketDetail()).getTicket(ButtonType.Free);
            })
            test('Donate and claim - not live', async ({ page, qaURL, pageHandler }) => {
                await pageHandler.gotoUpcomingShow()
        
                await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
        
                await (await pageHandler.ticketDetail()).getTicket(ButtonType.Donate);
            })
        })

        
        test('Discounted - not live', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
    
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Free);
    
            await (await pageHandler.ticketDetail()).getTicket(ButtonType.Discounted);
        })
    })


    test('Purchasee', async ({ page, qaURL, pageHandler }) => {
        await pageHandler.gotoUpcomingShow()
        await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Purchase);
        // await expect(page).toHaveURL(/\/t\/.*/);
    
    })

    test.describe('claim or donate', () => {
        test('Free', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
            // await expect(page).toHaveURL(/\/t\/.*/);
        })

        test('Donate', async ({ page, qaURL, pageHandler }) => {
            await pageHandler.gotoUpcomingShow()
            await (await pageHandler.upcomingShow()).clickShow(ShowType.OneTime, TicketType.Donate);
            // await expect(page).toHaveURL(/\/t\/.*/);
        })
    })

    // test.only('', async ({ page, qaURL, pageHandler }) => {
    //     await pageHandler.gotoUpcomingShow()
    //     await (await pageHandler.upcomingShow()).clickShow('one-time', 'Discounted');
    //     await expect(page).toHaveURL(/\/t\/.*/);
    
    // })
});

test.describe('Show', () => {

    test('Capture API requests and responses', async ({ page }) => {
        // ✅ Log all outgoing requests
        page.on('request', (request) => {
            console.log('📡 Request:', request.url());
            console.log('📝 Headers:', request.headers());
        });
    
        // ✅ Log all responses and attempt to parse JSON
        page.on('response', async (response) => {
            console.log('🔍 Response URL:', response.url());
            try {
                const jsonData = await response.json();
                console.log('🎯 Parsed JSON:', jsonData);
            } catch (error) {
                console.log('❌ Failed to parse JSON:', error);
            }
        });
    
        // 🔹 Navigate to Volume.com (or any target site)
        await page.goto('https://volume.com');
    
        // 🔹 Wait for network requests to finish
        await page.waitForTimeout(5000);
    });

})