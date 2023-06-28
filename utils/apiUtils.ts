import { APIRequestContext } from '@playwright/test';

export class ApiUtils {

    readonly apiRequestContext: APIRequestContext;
    readonly loginData: any;

    constructor(apiContext: APIRequestContext, loginData: any) {
        this.apiRequestContext = apiContext;
        this.loginData = loginData;
    }

    async createOrder(orderPayload: any) {
        const response = await this.apiRequestContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                headers: {
                    'Authorization': await this.getToken(),
                    'content-type': 'application/json'
                },
                data: orderPayload
            });
        if (!response.ok()) {return;}
        const orderResponseId = (await response.json()).orders[0];
        console.log(orderResponseId);
        return orderResponseId;
    }

    async getToken() {
        const response = await this.apiRequestContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginData
        });
        if (!response.ok()) {return;}
        const token = await (await response.json()).token;
        console.log(token);
        return token;
    }
}
