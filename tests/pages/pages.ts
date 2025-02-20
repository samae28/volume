import { Page } from '@playwright/test';
import { NavigationPage } from './navigation';
import { LoginPage } from './login-page';

export class Pages{
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly loginPage: LoginPage

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.loginPage = new LoginPage(this.page);
    }

    navigation(){
        return this.navigationPage
    }

    login(){
        return this.loginPage
    }
}