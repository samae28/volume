import { Page } from '@playwright/test';
import { UpcomingShowPage } from './upcoming-show-page';
import { TicketDetailPage } from './ticket-detail-page'
import { LoginPage } from './login-page';

export class PageHandler {
    private readonly page: Page;
    private readonly loginPage: LoginPage
    private readonly upcomingShowPage: UpcomingShowPage
    private readonly ticketDetailPage: TicketDetailPage

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.upcomingShowPage = new UpcomingShowPage(this.page);
        this.ticketDetailPage = new TicketDetailPage(this.page)
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
}