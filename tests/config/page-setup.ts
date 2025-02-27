import { test as base } from '@playwright/test'
import { PageHandler } from '../pages/pages'

export type Setup = {
    qaURL: string
    pageHandler: PageHandler
}

export const test = base.extend<Setup>({
    qaURL: ['', {option: true}],

    pageHandler: async ({ page }, use) => {
        await use(new PageHandler(page))
    },
})