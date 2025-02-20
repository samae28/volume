import { Pages  } from '../../../pages/pages'

export const locators = {
    actualMessage: async (pages: Pages) => await pages.login().emptyValidationMessage(),
};
