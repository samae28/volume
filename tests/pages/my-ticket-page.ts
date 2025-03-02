import { Page, Locator, expect } from '@playwright/test'

export class MyTicketPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


}