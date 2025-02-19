import { Page } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation';
import { LoginForm } from '../page-objects/loginPage';

export class PageManager{
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly loginForm: LoginForm

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.loginForm = new LoginForm(this.page);
    }

    navigation(){
        return this.navigationPage
    }

    login(){
        return this.loginForm
    }
}