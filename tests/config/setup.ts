import { test as base } from '@playwright/test'

export type Setup = {
    qaURL: string
}

export const test = base.extend<Setup>({
    qaURL: ['', {option: true}]
})