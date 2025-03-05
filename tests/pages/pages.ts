import { Page } from "playwright";
import { Assertions } from "tests/utils/assertion";
import { UpcomingShowPage } from "./upcoming-show-page";
import { TicketDetailPage } from "./ticket-detail-page";
// import { TicketConfirmationPage } from "./ticket-confirmation-page";
import { PaymentPage } from "./payment-page";
import { ProductCheckoutPage } from "./product-checkout-page";

export class PageHandler{
    private readonly page: Page;
    private readonly assertions: Assertions
    private readonly upcomingShowPage: UpcomingShowPage
    private readonly ticketDetailPage: TicketDetailPage
    // private readonly ticketConfirmationPage: TicketConfirmationPage
    private readonly paymentPage: PaymentPage
    private readonly productCheckoutPage: ProductCheckoutPage

    constructor(page: Page) {
        this.page = page;
        this.assertions = new Assertions(this.page)
        this.upcomingShowPage = new UpcomingShowPage(this.page);
        this.ticketDetailPage = new TicketDetailPage(this.page);
        // this.ticketConfirmationPage = new TicketConfirmationPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.productCheckoutPage = new ProductCheckoutPage(this.page);
    }

    async navigateToUpcomingShows() {
        await this.page.goto('https://volume-qa3.skydev.solutions/');
        await this.page.locator('li').getByText('Upcoming Shows').click();
        return this.upcomingShowPage;
    }

    upcomingShow(){
        return this.upcomingShowPage
    }
    ticketDetail(){
        return this.ticketDetailPage
    }

    payment(){
        return this.paymentPage
    }

    productCheckout() {
        return this.productCheckoutPage
    }

    assertion(){
        return this.assertions
    }
}