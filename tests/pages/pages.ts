import { Page } from "playwright";
import { Assertions } from "tests/utils/assertion";
import { UpcomingShowPage } from "./upcoming-show-page";
import { TicketDetailPage } from "./ticket-detail-page";
import { PaymentPage } from "./payment-page";
import { ProductCheckoutPage } from "./product-checkout-page";

// export class PageHandler{
//     private readonly page: Page;
//     private readonly assertions: Assertions
//     private readonly upcomingShowPage: UpcomingShowPage
//     private readonly ticketDetailPage: TicketDetailPage
//     // private readonly ticketConfirmationPage: TicketConfirmationPage
//     private readonly paymentPage: PaymentPage
//     private readonly productCheckoutPage: ProductCheckoutPage

//     constructor(page: Page) {
//         this.page = page;
//         this.assertions = new Assertions(this.page)
//         this.upcomingShowPage = new UpcomingShowPage(this.page);
//         this.ticketDetailPage = new TicketDetailPage(this.page);
//         // this.ticketConfirmationPage = new TicketConfirmationPage(this.page);
//         this.paymentPage = new PaymentPage(this.page);
//         this.productCheckoutPage = new ProductCheckoutPage(this.page);
//     }

//     async navigateToUpcomingShows() {
//         await this.page.goto('https://volume-qa3.skydev.solutions/');
//         await this.page.locator('li').getByText('Upcoming Shows').click();
//         return this.upcomingShowPage;
//     }

//     upcomingShow(){
//         return this.upcomingShowPage
//     }
//     ticketDetail(){
//         return this.ticketDetailPage
//     }

//     payment(){
//         return this.paymentPage
//     }

//     productCheckout() {
//         return this.productCheckoutPage
//     }

//     assertion(){
//         return this.assertions
//     }
// }

export class PageHandler {
    private readonly page: Page;
    private _assertions?: Assertions
    private _upcomingShowPage?: UpcomingShowPage;
    private _ticketDetailPage?: TicketDetailPage;
    private _paymentPage?: PaymentPage;
    private _productCheckoutPage?: ProductCheckoutPage;

    constructor(page: Page) {
        this.page = page;
    }

        async navigateToUpcomingShows() {
        await this.page.goto('https://volume.com/');
        await this.page.locator('li').getByText('Upcoming Shows').click();
        if (!this._upcomingShowPage) {
            this._upcomingShowPage = new UpcomingShowPage(this.page);
        }
        return this._upcomingShowPage;
    }
    upcomingShow(): UpcomingShowPage {
        if (!this._upcomingShowPage) {
            this._upcomingShowPage = new UpcomingShowPage(this.page);
        }
        return this._upcomingShowPage;
    }

    ticketDetail(): TicketDetailPage {
        if (!this._ticketDetailPage) {
            this._ticketDetailPage = new TicketDetailPage(this.page);
        }
        return this._ticketDetailPage;
    }

    payment(): PaymentPage {
        if (!this._paymentPage) {
            this._paymentPage = new PaymentPage(this.page);
        }
        return this._paymentPage;
    }

    productCheckout(): ProductCheckoutPage {
        if (!this._productCheckoutPage) {
            this._productCheckoutPage = new ProductCheckoutPage(this.page);
        }
        return this._productCheckoutPage;
    }
        assertion(){
        if (!this._assertions) {
            this._assertions = new Assertions(this.page);
        }
        return this._assertions;
    }
}
