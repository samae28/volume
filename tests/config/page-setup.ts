import { test as base } from '@playwright/test'
import { PageHandler } from '../pages/pages'
import { defineConfig, devices } from '@playwright/test'

export type Setup = {
    qaURL: string
    pageHandler: PageHandler
}

export const test = base.extend<Setup>({
    qaURL: ['', {option: true}],
    
    pageHandler: async({page}, use) => {
        const pages = new PageHandler(page)
        await use(pages)
    }
})