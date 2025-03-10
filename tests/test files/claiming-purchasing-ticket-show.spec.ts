import { test,  } from '../config/page-setup';
import * as Components from 'tests/utils/utils';


test.describe('One Time Show', async () => {
    test.describe('Ticket is not yet claimed and Broadcaster is not yet live', async () => {
        test('Free ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Free);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })

        test('Purchase ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Purchase);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Buy, 20 );
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()

            await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
            await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

            await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })

        test.describe('Donate', async() => {
            test('Claim Free Ticket', async({page, pageHandler}) => {
                await pageHandler.navigateToUpcomingShows();
                await pageHandler.assertion().assertUpcomingPageLoaded()

                await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 0);
                await pageHandler.assertion().assertTicketDetailPageLoaded()

                await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
                await pageHandler.assertion().assertTicketConfirmationPageLoaded()
            })

            test('Donate to Claim', async({page, pageHandler}) => {
                await pageHandler.navigateToUpcomingShows();
                await pageHandler.assertion().assertUpcomingPageLoaded()

                await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 1);
                await pageHandler.assertion().assertTicketDetailPageLoaded()

                await pageHandler.ticketDetail().getTicket(Components.ButtonType.Donate);
                await pageHandler.assertion().assertTicketConfirmationPageLoaded()

                await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
                await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

                await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
                await pageHandler.assertion().assertTicketConfirmationPageLoaded()
            })
        })
    })

test.describe('Ticket is not yet claimed and Broadcaster is live', async () => {
    test('Free ticket', async({page, pageHandler}) => {
        await pageHandler.navigateToUpcomingShows();
        await pageHandler.assertion().assertUpcomingPageLoaded()

        await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Free);
        await pageHandler.assertion().assertTicketDetailPageLoaded()

        await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
        await pageHandler.assertion().assertLivePageLoaded()
    })

    test('Purchase ticket', async({page, pageHandler}) => {
        await pageHandler.navigateToUpcomingShows();
        await pageHandler.assertion().assertUpcomingPageLoaded()

        await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Purchase);
        await pageHandler.assertion().assertTicketDetailPageLoaded()

        await pageHandler.ticketDetail().getTicket(Components.ButtonType.Buy, 20 );
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()

        await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
        await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()
        
        await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
        await pageHandler.assertion().assertLivePageLoaded()
    })

    test.describe('Donate', async() => {
        test('Claim Free Ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 0);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
            await pageHandler.assertion().assertLivePageLoaded()
        })
    
        test('Donate to Claim', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 1);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Donate);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()

            await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
            await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

            await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
            await pageHandler.assertion().assertLivePageLoaded()
        })
    })
})

    test.describe('Ticket is claimed and Broadcaster is not yet live' , async () => {
        test('Free ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Free);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })
    
        test('Purchase ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Purchase);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })
   
        test.describe('Donate', async() => {
            test('Claim Free Ticket', async({page, pageHandler}) => {
                await pageHandler.navigateToUpcomingShows();
                await pageHandler.assertion().assertUpcomingPageLoaded()

                await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 0);
                await pageHandler.assertion().assertTicketDetailPageLoaded()

                await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
                await pageHandler.assertion().assertTicketConfirmationPageLoaded()
            })
        
            test('Donate to Claim', async({page, pageHandler}) => {
                await pageHandler.navigateToUpcomingShows();
                await pageHandler.assertion().assertUpcomingPageLoaded()

                await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 1);
                await pageHandler.assertion().assertTicketDetailPageLoaded()

                await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
                await pageHandler.assertion().assertTicketConfirmationPageLoaded()
            })
        })
    })

    test.describe('Ticket is claimed and Broadcaster is live' , async () => {
        test('Free ticket', async({page, pageHandler }) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Free);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertLivePageLoaded()
        })
   
        test('Purchase ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Purchase);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertLivePageLoaded()
        })
   
      test.describe('Donate', async() => {
         test('Claim Free Ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 0);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertLivePageLoaded()
         })
      
         test('Donate to Claim', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.OneTime, Components.TicketType.Donate, 1);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.ViewButton);
            await pageHandler.assertion().assertLivePageLoaded()
         })
      })
   })
})

test.describe('Festival show', async () => {
    test('Free ticket', async({page, pageHandler}) => {
        await pageHandler.navigateToUpcomingShows();
        await pageHandler.assertion().assertUpcomingPageLoaded()

        await pageHandler.upcomingShow().clickShow(Components.ShowType.Festival, Components.TicketType.Free);
        await pageHandler.assertion().assertTicketDetailPageLoaded()

        await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()
    })

    test.describe('Ticket With Price', async() => {
    test('Discounted', async({page, pageHandler}) => {
        await pageHandler.navigateToUpcomingShows();
        await pageHandler.assertion().assertUpcomingPageLoaded()

        await pageHandler.upcomingShow().clickShow(Components.ShowType.Festival, Components.TicketType.Purchase, 0);
        await pageHandler.assertion().assertTicketDetailPageLoaded()

        await pageHandler.ticketDetail().getTicket(Components.ButtonType.Buy, 10);
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()
         
        await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
        await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

        await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()
    })

    test('Whole Price', async({page, pageHandler}) => {
        await pageHandler.navigateToUpcomingShows();
        await pageHandler.assertion().assertUpcomingPageLoaded()

        await pageHandler.upcomingShow().clickShow(Components.ShowType.Festival, Components.TicketType.Purchase, 1);
        await pageHandler.assertion().assertTicketDetailPageLoaded()

        await pageHandler.ticketDetail().getTicket(Components.ButtonType.Buy, 8);
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()

        await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
        await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

        await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
        await pageHandler.assertion().assertTicketConfirmationPageLoaded()
      })
    })

    test.describe('Donate', async() => {
        test('Claim Free Ticket', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.Festival, Components.TicketType.Donate, 0);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Free);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })
   
        test('Donate to Claim', async({page, pageHandler}) => {
            await pageHandler.navigateToUpcomingShows();
            await pageHandler.assertion().assertUpcomingPageLoaded()

            await pageHandler.upcomingShow().clickShow(Components.ShowType.Festival, Components.TicketType.Donate, 1);
            await pageHandler.assertion().assertTicketDetailPageLoaded()

            await pageHandler.ticketDetail().getTicket(Components.ButtonType.Donate);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()

            await pageHandler.payment().selectPaymentType(Components.PaymentType.CreditCard);
            await pageHandler.assertion().assertSelecPaymentMethodPageLoaded()

            await pageHandler.productCheckout().pay(Components.CardDetails.cardNumber, Components.CardDetails.expiry, Components.CardDetails.CVC);
            await pageHandler.assertion().assertTicketConfirmationPageLoaded()
        })
    })
})