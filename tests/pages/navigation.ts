import { Page, test } from '@playwright/test'

export class NavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async loginPage(){
        await this.page.getByText('Sign in').click()
    }
}