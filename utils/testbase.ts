import { test as base } from '@playwright/test';

type MyFixtures = {
    fixture1: TestData;
    fixture2: TestData;
}

type TestData = {
    username: string;
    password: string;
    productName: string;
}

export const test = base.extend<MyFixtures>({
    fixture1: async ({page}, use) => {
        const fixture: TestData = {
            username: 'qwe123@pl.pl',
            password: 'Qqq111!!!',
            productName: 'zara coat 3'
        };
        await use(fixture);
    },
    fixture2: async ({page}, use) => {
        const fixture: TestData = {
            username: 'qqq@www.eee',
            password: 'Qqq111!!!',
            productName: 'adidas original'
        };
        await use(fixture);
    }
});

export { expect } from '@playwright/test';
