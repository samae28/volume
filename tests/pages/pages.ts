import { Page } from '@playwright/test';

import { LoginPage } from './login-page';

import { UpcomingShowPage } from './upcoming-show-page';
import { TicketDetailPage } from './ticket-detail-page';
import { MyTicketPage } from './my-ticket-page.ts';
import { PaymentPage } from './payment-page.ts';

export class PageHandler {
    private readonly page: Page;
    private readonly loginPage: LoginPage
    private readonly upcomingShowPage: UpcomingShowPage
    private readonly ticketDetailPage: TicketDetailPage
    private readonly myTicketPage: MyTicketPage
    private readonly paymentPage: PaymentPage

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.upcomingShowPage = new UpcomingShowPage(this.page);
        this.ticketDetailPage = new TicketDetailPage(this.page);
        this.myTicketPage = new MyTicketPage(this.page)
        this.paymentPage = new PaymentPage(this.page)
    }

    async gotoUpcomingShow(){
        await this.page.goto('https://volume.com/');
        await this.page.locator('li').getByText('Upcoming Shows').click();
    }

    async login(){
        return this.loginPage
    }

    async upcomingShow(){
        return this.upcomingShowPage
    }

    async ticketDetail(){
        return this.ticketDetailPage
    }

    async myTicket(){
        return this.myTicketPage
    }

    async payment(){
        return this.paymentPage
    }
}